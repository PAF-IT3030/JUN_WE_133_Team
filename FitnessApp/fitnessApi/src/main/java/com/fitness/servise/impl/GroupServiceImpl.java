package com.fitness.servise.impl;

import com.fitness.dto.GroupRequestDto;
import com.fitness.entities.Group;
import com.fitness.repository.GroupRepository;
import com.fitness.servise.GroupService;

import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    @NonNull
    private final GroupRepository groupRepository;

    @Override
    public Group saveGroup(GroupRequestDto groupRequestDto) {
        Group mappedGroup = groupRequestDtoToGroup(groupRequestDto);
        return groupRepository.save(mappedGroup);
    }

    @Override
    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    @Override
    public void deleteGroupById(long id) {
        groupRepository.deleteById((int) id);
    }

    @Override
    public Group updateGroup(long id, GroupRequestDto groupRequestDto) {
        Optional<Group> optionalGroup = groupRepository.findById((int) id);
        if (optionalGroup.isPresent()) {
            Group group = optionalGroup.get();
            group.setTitle(groupRequestDto.getTitle());
            group.setImageUrl(groupRequestDto.getImageUrl());
            group.setCaption(groupRequestDto.getCaption());
            return groupRepository.save(group);
        } else {
            throw new EntityNotFoundException("Group not found with id: " + id);
        }
    }

    private Group groupRequestDtoToGroup(GroupRequestDto groupRequestDto) {
        Group group = new Group();
        group.setTitle(groupRequestDto.getTitle());
        group.setImageUrl(groupRequestDto.getImageUrl());
        group.setCaption(groupRequestDto.getCaption());
        return group;
    }
}
