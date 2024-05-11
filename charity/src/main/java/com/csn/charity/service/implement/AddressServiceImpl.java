package com.csn.charity.service.implement;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.csn.charity.model.Address;
import com.csn.charity.model.History;
import com.csn.charity.model.Project;
import com.csn.charity.model.User;
import com.csn.charity.repository.AddressRepository;
import com.csn.charity.repository.HistoryRepository;
import com.csn.charity.repository.ProjectRepository;
import com.csn.charity.repository.UserRepository;
import com.csn.charity.service.interfaces.AddressService;

@Service
public class AddressServiceImpl implements AddressService  {
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HistoryRepository historyRepository;

    @Override
    @Cacheable(value = "addressByProject", key ="#projectId")
    public List<Address> getAddressesByProject(Long projectId) {
        Project project = this.projectRepository.findById(projectId)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy danh mục với ID: " + projectId));
        return this.addressRepository.findByProject(project);
    }

    @Override
    @Cacheable(value = "addresses")
    public List<Address> getAll() {
        return this.addressRepository.findAll();
    }

    @Override
    @Cacheable(value = "address", key ="#id")
    public Address getById(Long id) {
        return this.addressRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy địa chỉ với ID: " + id));
    }

    @Override
    public Address addAddress(Address address, Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Unauthorized access");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng");
        }

        Optional<Project> optionalProject = projectRepository.findById(id);
        if (optionalProject.isEmpty()) {
            throw new NoSuchElementException("Không tìm thấy dự án");
        }

        Project project = optionalProject.get();

        address.setUser(user);
        address.setProject(project);
        address.setStatus("PENDING");

        this.addressRepository.save(address);
        
        History history = new History();
        history.setAction("Người dùng " + user.getUsername() + " đã thêm địa chỉ " + address.getName());
        history.setDate(new Date());
        history.setUser(user);

        this.historyRepository.save(history);

        return address;
    }

    @Override
    public Address updateById(Long id, Address address) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Unauthorized access");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng");
        }

        Address a = this.addressRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy địa chỉ với ID: " + id));

        boolean isAdmin = user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN") || role.getName().equals("ROLE_SUPERADMIN"));
        if (!a.getUser().equals(user) && !isAdmin) {
            throw new SecurityException("Bạn không có quyền cập nhật địa điểm này!!!");
        }

        a.setName(address.getName());
        a.setLatitude(address.getLatitude());
        a.setLongitude(address.getLongitude());
        a.setUser(user);
        a.setStatus("PENDING");
        this.addressRepository.save(a);
        History history = new History();
        history.setAction("Người dùng " + user.getUsername() + " đã cập nhật địa chỉ " + address.getName());
        history.setDate(new Date());
        history.setUser(user);

        this.historyRepository.save(history);

        return address;
    }

    @Override
    public void deleteById(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Unauthorized access");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng");
        }
        
        Address a = this.addressRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy địa chỉ với ID: " + id));
        boolean isAdmin = user.getRoles().stream().anyMatch(role -> role.getName().equals("ROLE_ADMIN") || role.getName().equals("ROLE_SUPERADMIN"));
        if (!a.getUser().equals(user) && !isAdmin) {
            throw new SecurityException("Bạn không có quyền xóa địa điểm này!!!");
        }

        this.addressRepository.delete(a);

        History history = new History();
        history.setAction("Người dùng " + user.getUsername() + " đã xóa địa chỉ " + a.getName());
        history.setDate(new Date());
        history.setUser(user);

        this.historyRepository.save(history);
    }

    @Override
    public List<Address> getPendingAddress() {
        return this.addressRepository.findByStatus("PENDING");
    }

    @Override
    public void acceptAddress(Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new NoSuchElementException("Không tìm thấy địa chỉ cần duyệt"));

        if (!address.getStatus().equals("PENDING")) {
            throw new IllegalStateException("Địa chỉ không ở trạng thái chờ xem xét");
        }

        address.setStatus("ACCEPTED");
        addressRepository.save(address);
    }

    @Override
    public void rejectAddress(Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new NoSuchElementException("Không tìm thấy địa chỉ cần duyệt"));

        if (!address.getStatus().equals("PENDING")) {
            throw new IllegalStateException("Địa chỉ không ở trạng thái chờ xem xét");
        }

        address.setStatus("DENIED");
        addressRepository.save(address);
    }

    @Override
    public List<Address> getAvailableAddresses() {
        return this.addressRepository.findByStatus("ACCEPTED");
    }
    
}
