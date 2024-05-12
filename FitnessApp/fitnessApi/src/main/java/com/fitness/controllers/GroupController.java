package com.fitness.controllers;


import com.fitness.dto.GroupRequestDto;
import com.fitness.entities.Group;
import com.fitness.servise.GroupService;
import jakarta.validation.Valid;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/v1/group")
@RequiredArgsConstructor

public class GroupController {

    @NonNull
    private  final GroupService groupService;

    @PostMapping // create group
    public ResponseEntity<?> saveGroup(@Valid @RequestBody GroupRequestDto groupRequestDto) {
        try {
            Group savedGroup = groupService.saveGroup(groupRequestDto);
            return ResponseEntity.ok(savedGroup);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to save group: " + e.getMessage());
        }
    }

    @GetMapping //get all groups
    public ResponseEntity<List<Group>> getAllGroups() {
        List<Group> groups = groupService.getAllGroups();
        return ResponseEntity.ok(groups);
    }

    @DeleteMapping("/{id}") //delete groups
    public ResponseEntity<String> deleteGroup(@PathVariable("id") long id) {
        groupService.deleteGroupById(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Group> updateGroup(@PathVariable("id") long id, @Valid @RequestBody GroupRequestDto groupRequestDto) {
        Group updatedGroup = groupService.updateGroup(id, groupRequestDto);
        if (updatedGroup != null) {
            return ResponseEntity.ok(updatedGroup);
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if group not found
        }
    }
}
