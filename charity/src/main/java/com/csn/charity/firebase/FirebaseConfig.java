package com.csn.charity.firebase;

import java.io.InputStream;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

@Service
public class FirebaseConfig {
    @Autowired
    private ResourceLoader resourceLoader;

   @PostConstruct
   public void init() {
       
       Resource resource = resourceLoader.getResource("classpath:serviceAccountKey.json");
       try {
            InputStream serviceAccount = resource.getInputStream();

            FirebaseOptions options = new FirebaseOptions.Builder()
                   .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                   .build();

           FirebaseApp.initializeApp(options);
           System.out.println("FirebaseApp initialized: " + FirebaseApp.getApps().size());

       } catch (Exception e) {
           e.printStackTrace();
       }

   }
}
