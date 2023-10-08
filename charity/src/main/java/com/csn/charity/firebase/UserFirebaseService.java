package com.csn.charity.firebase;

import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.csn.charity.dto.UserDTO;
import com.csn.charity.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class UserFirebaseService {
    private static final String COLLECTION_NAME = "users";

    public String saveUser(UserDTO userDTO) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(userDTO.getUsername()).set(userDTO);

        return collectionApiFuture.get().getUpdateTime().toString();
    }

    public User getUser(String username) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(username);
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        User user;
        if(document.exists()){
            user = document.toObject(User.class);
            return user;
        }

        return null;
    }

    // public String updateUser(User user) throws InterruptedException, ExecutionException {
    //     Firestore dbFirestore = FirestoreClient.getFirestore();
    //     ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(user.getUsername()).set(user);

    //     return collectionApiFuture.get().getUpdateTime().toString();
    // }

    // public String deleteUser(String username) throws InterruptedException, ExecutionException {
    //     Firestore dbFirestore = FirestoreClient.getFirestore();
    //     ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_NAME).document(username).delete();

    //     return "Delete successful";
    // }
}
