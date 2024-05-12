package com.fitness.servise;

import com.fitness.dto.GroupRequestDto;
import com.fitness.entities.Group;
import java.util.List;

public interface GroupService {
    Group saveGroup(GroupRequestDto groupRequestDto); //create groups
    List<Group> getAllGroups(); //get all groups
    void deleteGroupById(long id); //delete groups
    Group updateGroup(long id, GroupRequestDto groupRequestDto); //update groups
}
