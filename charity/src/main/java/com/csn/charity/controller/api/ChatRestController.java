// package com.csn.charity.controller.api;

// import java.util.List;
// import java.util.concurrent.ExecutionException;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.csn.charity.firebase.FirebaseService;
// import com.csn.charity.model.ChatRoom;
// import com.csn.charity.model.Message;
// import com.csn.charity.service.interfaces.ChatRoomService;
// import com.csn.charity.service.interfaces.MessageService;

// @RestController
// @RequestMapping("/api")
// public class ChatRestController {
//     @Autowired
//     private MessageService messageService;
//     @Autowired
//     private ChatRoomService chatRoomService;
//     @Autowired
//     private FirebaseService firebaseService;

//     @PostMapping("/room/")
//     @CrossOrigin
//     public ResponseEntity<ChatRoom> createRoom(@RequestBody ChatRoom chatRoom) throws InterruptedException, ExecutionException {
        
//         // System.out.println("DEBUG" + chatRoom.toString());
//         ChatRoom room = this.chatRoomService.createChatRoom(chatRoom);
//         System.out.println("DEBUG" + room.toString());
//         this.firebaseService.saveOrUpdateRoom(chatRoom);
//         System.out.println("DEBUG" + chatRoom.toString());
//         return new ResponseEntity<>(room, HttpStatus.CREATED);
//     }

//     @PostMapping("/room/{roomId}/message/")
//     public ResponseEntity<Message> createMessage(@PathVariable Long roomId, @RequestBody Message message) {
//         Message mess = this.messageService.sendMessage(message, roomId);
//         try {
//             this.firebaseService.sendMessage(message);
//         } catch (InterruptedException e) {
//             // TODO Auto-generated catch block
//             e.printStackTrace();
//         } catch (ExecutionException e) {
//             // TODO Auto-generated catch block
//             e.printStackTrace();
//         }
//         return new ResponseEntity<>(mess, HttpStatus.CREATED);
//     }

//     @GetMapping("/room/{roomId}/messages/")
//     public ResponseEntity<List<Message>> getMessage(@PathVariable Long roomId) {
//         return new ResponseEntity<>(this.messageService.getMessageByRoom(roomId), HttpStatus.OK);
//     }

// }
