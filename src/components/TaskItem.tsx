import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, FlatListProps, TextInput } from 'react-native';

import { Task, TasksListProps } from './TasksList'

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

import { EditTaskProps } from '../pages/Home';
import { useEffect } from 'react';

interface TaskItemProps {
  index: number;
  tasks: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ id, newTaskTitle }: EditTaskProps) => void;
}

export function TaskItem({ index, tasks, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitleEdit, setTaskNewTitleEdit] = useState(tasks.title);
  const textInputRef = useRef<TextInput>(null)


  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitleEdit(tasks.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ id: tasks.id, newTaskTitle: taskNewTitleEdit });
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => { toggleTaskDone(tasks.id) }}
        >
          <View
            testID={`marker-${index}`}
            //TODO - use style prop
            style={tasks.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {tasks.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          {/*<Text
            //TODO - use style prop
            style={tasks.done ? styles.taskTextDone : styles.taskText}
          >
            {tasks.title}
            </Text>*/}

          <TextInput
            value={taskNewTitleEdit}
            onChangeText={setTaskNewTitleEdit}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={tasks.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>


      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity
            testID={`trash-${index}`}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) :
          (<TouchableOpacity
            testID={`trash-${index}`}
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
          )}
        <View style={styles.iconsDivider} />
        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={() => { removeTask(tasks.id) }}
          disabled={isEditing}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  infoContainer: {
    flex: 1
  },

  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },

  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },

  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },

  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 24
  },

  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 12
  }
})