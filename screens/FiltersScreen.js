import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useDispatch } from "react-redux";
import MenuButton from "../components/MenuButton";
import SaveButton from "../components/SaveButton";
import Colors from "../constants/Colors";
import { setFilter } from "../store/actions/meals";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        value={props.value}
        onValueChange={props.onChange}
        trackColor={{ true: Colors.mainColor }}
      ></Switch>
    </View>
  );
};
export default function FiltersScreen(props) {
  const { navigation } = props;
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegeterian, setIsVegeterian] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const dispatch = useDispatch();
  const saveFilteres = useCallback(() => {
    const currentFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegeterian: isVegeterian,
    };
    dispatch(setFilter(currentFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegeterian, dispatch]);
  useEffect(() => {
    navigation.setParams({ save: saveFilteres });
  }, [saveFilteres]);
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten free"
        value={isGlutenFree}
        onChange={(newVal) => {
          setIsGlutenFree(newVal);
        }}
      />
      <FilterSwitch
        label="Vegan"
        value={isVegan}
        onChange={(newVal) => {
          setIsVegan(newVal);
        }}
      />
      <FilterSwitch
        label="vegetrian"
        value={isVegeterian}
        onChange={(newVal) => {
          setIsVegeterian(newVal);
        }}
      />
      <FilterSwitch
        label="lactose free"
        value={isLactoseFree}
        onChange={(newVal) => {
          setIsLactoseFree(newVal);
        }}
      />
    </View>
  );
}

FiltersScreen.navigationOptions = (navDate) => {
  return {
    HeaderTitle: "Filter",
    headerLeft: MenuButton(navDate),
    headerRight: SaveButton(navDate),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignContent: "center",
  },
  filterContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "80%",
    margin: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "open-sans-bold",
  },
});
