import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import className from "twrnc";

type Task = {
  key: string;
  value: string;
};

const index = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<any>([]);
  const [editKey, setEditKey] = useState(null);

  const addTask = () => {
    if (task.trim()) {
      if (editKey !== null) {
        setTasks(
          tasks.map((item: Task) =>
            item.key === editKey ? { key: item.key, value: task } : item
          )
        );
        setEditKey(null);
      } else {
        setTasks([...tasks, { key: tasks.length.toString(), value: task }]);
      }
      setTask("");
    }
  };

  const deleteTask = (key: any) => {
    setTasks(tasks.filter((item: Task) => item.key !== key));
  };

  const editTask = (key: any, value: any) => {
    setTask(value);
    setEditKey(key);
  };

  return (
    <View style={className`p-4 gap-2 mt-6`}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Text style={className`text-2xl font-bold`}>TODO LIST APP</Text>
      <View
        style={className` flex-row justify-between items-center gap-2 bg-white shadow-md p-2 rounded-lg`}
      >
        <TextInput
          placeholder="Enter TODOS"
          style={className` flex-1 p-2 text-lg bg-blue-200 rounded-1g`}
          onChangeText={setTask}
          value={task}
        />
        <Pressable onPress={addTask}>
          <Text
            style={className` p-2 text-white text-lg bg-blue-500 rounded-1g`}
          >
            {editKey !== null ? "Update" : "Add"} todo
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View
            style={className` gap-2 my-2 bg-green-100 rounded-lg p-2`}
            key={item.key}
          >
            <Text style={className`p-2 rounded-lg bg-blue-200`}>
              {item.value}
            </Text>
            <View style={className` flex-row justify-end items-center gap-2`}>
              <Pressable onPress={() => editTask(item.key, item.value)}>
                <Text
                  style={className`p-2 text-white text-lg bg-blue-500 rounded-lg  text-center `}
                >
                  Edit
                </Text>
              </Pressable>
              <Pressable onPress={() => deleteTask(item.key)}>
                <Text
                  style={className`p-2 text-white text-lg bg-red-500 rounded-lg  text-center `}
                >
                  Delete
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default index;
