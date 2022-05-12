import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);


  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };
    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const tasksClone = [...tasks];
    const index = tasksClone.findIndex(task => task.id === id);
    tasksClone[index].done = !tasksClone[index].done;
    setTasks(tasksClone);

  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    const tasksClone = [...tasks];
    const newTasks = tasksClone.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})