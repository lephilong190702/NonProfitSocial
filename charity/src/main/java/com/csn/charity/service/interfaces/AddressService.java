package com.csn.charity.service.interfaces;

import java.util.List;


import com.csn.charity.model.Address;

public interface AddressService {
    List<Address> getAddressesByProject(Long projectId);

    List<Address> getAll();

    List<Address> getAvailableAddresses();

    List<Address> getPendingAddress();

    void acceptAddress(Long addressId);

    void rejectAddress(Long addressId);

    Address getById(Long id);

    Address addAddress(Address address, Long id);

    Address updateById(Long id, Address address);

    void deleteById(Long id);
}
