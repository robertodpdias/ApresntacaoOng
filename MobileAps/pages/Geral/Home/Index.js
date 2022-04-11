import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar} from 'react-native';

import { Feather } from '@expo/vector-icons';

import global from "../../Global/Style"

export default function Home({navigation}) {
  return (
    <View style={global.body}>
      <StatusBar
        barStyle = "dark-content"
        hidden = {false}
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={css.cardColor1}></View>
      <View style={css.cardColor2}></View>
      <View style={css.header}>
        <Feather onPress={() => { navigation.openDrawer() }} name="menu" size={35} color="black" />
        <View style={{width: "45%", height: "100%", alignItems: "center", justifyContent: "center"}}>
          <Text style={css.textLogo}>CASA ACOLHEDORA</Text>
          <Text style={css.textLogo}> IRMÃ ANTÔNIA</Text>
        </View>
      </View>
      <ScrollView style={css.scrollView}>
      <TouchableOpacity style={global.card} onPress={() => {navigation.navigate("ListarAssistidos")}}>
                <Text style={css.title}>Lista de Assistidos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={global.card} onPress={() => {navigation.navigate("ListarFuncionario")}}>
                <Text style={css.title}>Lista de Funcionários</Text>
            </TouchableOpacity>
            <TouchableOpacity style={global.card} onPress={() => {navigation.navigate("CadastrarAssistido")}}>
                <Text style={css.title}>Cadastrar Assistido</Text>
            </TouchableOpacity>
            <TouchableOpacity style={global.card} onPress={() => {navigation.navigate("CadastrarFuncionario")}}>
                <Text style={css.title}>Cadastrar Funcionário</Text>
            </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const css = StyleSheet.create({
  cardColor1:{
    width: "100%",
    height: "25%",
    backgroundColor: "#166B8A",
    position: "absolute",
    borderBottomLeftRadius: 112.5
  },
  cardColor2:{
    width: "100%",
    height: "25%",
    backgroundColor: "#166B8A",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 112.5
  },
  header: {
    width: '90%',
    height: '15%',
    borderBottomWidth: 2,
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: 'row'
  },
  title:{
    fontWeight: "bold",
    fontSize: 18
  },
  textLogo: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold"
  },
  scrollView: {
    width: "100%",
    height: 425
  },
})