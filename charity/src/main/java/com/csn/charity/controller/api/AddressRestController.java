package com.csn.charity.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csn.charity.model.Address;
import com.csn.charity.service.interfaces.AddressService;

@RestController
@RequestMapping("/api")
public class AddressRestController {

    @Autowired
    private AddressService addressService;

    @GetMapping("/addresses/")
    @CrossOrigin
    public ResponseEntity<?> getAllAddresses() {
        try {
            return new ResponseEntity<>(this.addressService.getAvailableAddresses(), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/addresses/{addressId}")
    @CrossOrigin
    public ResponseEntity<?> getAddressById(@PathVariable(value = "addressId") Long addressId) {
        try {
            return new ResponseEntity<>(this.addressService.getById(addressId), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/{projectId}/addresses/")
    @CrossOrigin
    public ResponseEntity<?> getAddressesByProject(@PathVariable Long projectId) {
        try {
            return new ResponseEntity<>(addressService.getAddressesByProject(projectId), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        
    }

    @PostMapping("/{projectId}/address/")
    @CrossOrigin
    public ResponseEntity<?> addAddress(@RequestBody Address address, @PathVariable Long projectId) {
        try {
            Address a = this.addressService.addAddress(address, projectId);
            return new ResponseEntity<>(a, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PutMapping("/address/{id}")
    @CrossOrigin
    public ResponseEntity<String> updateAddress(@PathVariable(value = "id") Long id,
            @RequestBody Address address) {
        try {
            this.addressService.updateById(id, address);
            return ResponseEntity.ok("Bình luận đã được cập nhật thành công.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @DeleteMapping("/address/{id}")
    @CrossOrigin
    public ResponseEntity<String> deleteAddress(@PathVariable Long id) {
        try {
            addressService.deleteById(id);
            return ResponseEntity.ok("Địa chỉ đã được xóa thành công.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
