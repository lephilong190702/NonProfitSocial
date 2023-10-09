package com.csn.charity.firebase;

import java.util.Date;
import java.util.NoSuchElementException;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.csn.charity.model.MessageDoc;
import com.csn.charity.model.User;
import com.csn.charity.model.UserDoc;
import com.csn.charity.repository.UserRepository;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class FirebaseService {
    @Autowired
    private UserRepository userRepository;

    public String saveOrUpdateUser(UserDoc userDoc) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        userDoc.setUpdateAt(new Date());
        DocumentReference documentReference = dbFirestore.collection("users").document(userDoc.getId().toString());
        ApiFuture<WriteResult> collectionApiFuture = documentReference.set(userDoc);

        return collectionApiFuture.get().getUpdateTime().toString();
    }

    public DocumentReference create(MessageDoc messageDoc) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<DocumentReference> documentReference = dbFirestore.collection("messages").add(messageDoc);
        return documentReference.get();
    }

    public String sendMessage(MessageDoc messageDoc) throws InterruptedException, ExecutionException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new SecurityException("Unauthorized access");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new NoSuchElementException("Không tìm thấy người dùng");
        }

        messageDoc.setUserId(user.getId());
        messageDoc.setCreateAt(new Date());
        messageDoc.setUpdateAt(new Date());
        messageDoc.setRoomName("ROOM_" + user.getId() + "_");

        DocumentReference documentReference = create(messageDoc);
        return documentReference.getId();
    }

    public UserDoc getUser(String id) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("users").document(id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();
        UserDoc userDoc;
        if (document.exists()) {
            userDoc = document.toObject(UserDoc.class);
            return userDoc;
        }

        return null;
    }

    // public String updateUser(User user) throws InterruptedException,
    // ExecutionException {
    // Firestore dbFirestore = FirestoreClient.getFirestore();
    // ApiFuture<WriteResult> collectionApiFuture =
    // dbFirestore.collection(COLLECTION_NAME).document(user.getUsername()).set(user);

    // return collectionApiFuture.get().getUpdateTime().toString();
    // }

    // public String deleteUser(String username) throws InterruptedException,
    // ExecutionException {
    // Firestore dbFirestore = FirestoreClient.getFirestore();
    // ApiFuture<WriteResult> collectionApiFuture =
    // dbFirestore.collection(COLLECTION_NAME).document(username).delete();

    // return "Delete successful";
    // }
}
