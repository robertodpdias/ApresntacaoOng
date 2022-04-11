import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, ToastAndroid, TouchableOpacity, StatusBar} from 'react-native';

import global from "../../Global/Style"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function Login({navigation}) {
  const [recupSenha, setRecupSenha] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailNovo, setEmailNovo] = useState("");
  const[cpf, setCpf] = useState("")
  const [senhaNova, setSenhaNova] = useState("");
  const[mostrar1, setMostrar1] = useState(true);
  const[mostrar2, setMostrar2] = useState(true);

  const recuperarSenha = () => {
    setRecupSenha(true);
  }

  useEffect(async() => {
    if(await AsyncStorage.getItem('userdata') !== null) {
      navigation.navigate("ContainerHome");
    }
  }, [])

  const autenticar = () => {
    let funcionario = {
      email: email,
      senha: senha
    }

    // fetch(`http://10.87.207.27:3000/funcionarios`, {
      // fetch(`http://192.168.137.1:3000/funcionarios`, {
        fetch(`http://192.168.0.29:3000/funcionarios`, {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      },
      "body": JSON.stringify(funcionario),
    })
    .then(resp => {return resp.json()})
    .then(async data => {
      if(data.id_funcionario !== undefined) {
        await AsyncStorage.setItem('userdata', JSON.stringify(data.matricula));
        navigation.navigate('ContainerHome');
        console.log(data.matricula)
      }else {
          ToastAndroid.show('Email ou Senha Invalidos', ToastAndroid.SHORT);
      }
    })
    .catch(err => { console.log(err) });
  }

  const recSenha = () =>{
    let funcionario = {
      email: emailNovo,
      cpf: cpf,
      nova_senha: senhaNova
    }

    // fetch(`http://10.87.207.27:3000/funcionario/reset_senha`, {
      // fetch(`http://192.168.137.1:3000/funcionario/reset_senha`, {
        fetch(`http://192.168.0.29:3000/funcionario/reset_senha`, {
      "method": "PUT",
      "headers": {
          "Content-Type": "application/json"
      },
      "body": JSON.stringify(funcionario),
    })
    .then(resp => {return resp.json()})
    .then( async data => {
      if(data !== undefined) {
        await AsyncStorage.setItem('userdata', JSON.stringify(data));
        setEmailNovo('')
        setSenhaNova('')
        setCpf('')
        ToastAndroid.show('Senha alterada com sucesso!', ToastAndroid.SHORT);
      }else {
          ToastAndroid.show('Não foi possivel alterar a senha!', ToastAndroid.SHORT);
      }
    })
    .catch(err => { console.log(err) });
  }

  return (
    <View style={global.body}>
      <StatusBar
            barStyle = "dark-content"
            hidden = {true}
            backgroundColor="transparent"
            translucent={true}
        />
      {
        (recupSenha) ?
          <View style={css.screen2}>
            <Ionicons name="arrow-back-circle-outline" style={css.icon} size={35} color="white" onPress={() => setRecupSenha(false)} />
            <Text style={css.title2}>Recuperar senha</Text>
            <View style={css.inputs}>
              <TextInput placeholder={"E-mail..."} value={emailNovo} onChangeText={setEmailNovo} placeholderTextColor={"white"} style={css.input2}></TextInput>
              <TextInput placeholder={"CPF..."} value={cpf} onChangeText={setCpf} placeholderTextColor={"white"} style={css.input2}></TextInput>
              <View style={{width: "80%", borderBottomWidth: 1, borderBottomColor: 'white', padding: "2%", marginTop: "15%", flexDirection: "row"}}>
                <TextInput placeholder={"Nova senha..."} value={senhaNova} onChangeText={setSenhaNova} secureTextEntry={mostrar2} placeholderTextColor={"white"} style={{width: "90%", height: "100%", color: "white"}}></TextInput>
                <TouchableOpacity style={{width: "10%", height: "100%"}} onPress={() => {setMostrar2(!mostrar2)}}>
                  {
                    (mostrar2 === true)
                    ?
                    <FontAwesome name="eye" size={24} color="white" />
                    :
                    <FontAwesome name="eye-slash" size={24} color="white" />
                  }
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={global.cardButton2} onPress={() => { recSenha()}}>
              <Text style={global.buttonText2}>SALVAR</Text>
            </TouchableOpacity>
          </View>
          :
          <View style={css.screen1}>
            <View style={css.cardTitle}>
                    <Text style={css.textTitle}>CASA ACOLHEDORA</Text>
                    <Text style={css.textTitle}>IRMÃ ANTÔNIA</Text>
            </View>
            <Text style={css.title1}>LOGIN</Text>
            <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={css.input1}/>
            <View style={{width: "80%", borderBottomWidth: 1, borderBottomColor: 'black', padding: "2%", marginBottom: "10%", flexDirection: "row"}}>
              <TextInput style={{width: "90%", height: "100%"}} secureTextEntry={mostrar1} placeholder="Senha" value={senha} onChangeText={setSenha}/>
              <TouchableOpacity style={{width: "10%", height: "100%"}} onPress={() => {setMostrar1(!mostrar1)}}>
                {
                  (mostrar1 === true)
                  ?
                  <FontAwesome name="eye" size={24} color="black" />
                  :
                  <FontAwesome name="eye-slash" size={24} color="black" />
                }
              </TouchableOpacity>
            </View>
            <Text style={css.button} onPress={() => {recuperarSenha()}}>Esqueci a senha</Text>
            <TouchableOpacity style={global.cardButton1} onPress={() => autenticar()}>
              <Text style={global.buttonText1}>ENTRAR</Text>
            </TouchableOpacity>
          </View>
      }
    </View>
  );
}

const css = StyleSheet.create({
  cardTitle: {
      backgroundColor: "#166B8A",
      width: "90%",
      height: "20%",
      alignSelf: "flex-end",
      borderBottomLeftRadius: 66,
      alignItems: "center",
      justifyContent: "center",
  },
  textTitle: {
      color: "white",
      fontSize: 18
  },
  title1: {
      color: "black",
      fontWeight: 'bold',
      fontSize: 24,
      marginTop: "10%",
      marginBottom: "10%"
  },
  title2: {
      color: "white",
      fontWeight: 'bold',
      fontSize: 24,
  },
  screen1:{
      width: "100%",
      height:"100%",
      alignItems: 'center'
  },
  screen2:{
      width: "100%",
      height:"100%",
      alignItems: 'center',
      backgroundColor: "rgb(22,107,138)"
  },
  input1:{
      width: "80%",
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      padding: "2%",
      marginBottom: "10%"
  },
  input2:{
      width: "80%",
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      padding: "2%",
      marginTop: "15%",
      color: "white"
  },
  button:{
      color:"rgb(22,107,138)",
      fontWeight: "bold",
      fontSize: 14,
      marginRight: -190,
      marginTop: -10,
      marginBottom: "30%"
  },
  icon:{
      alignSelf: "flex-start",
      marginTop: "10%",
      marginLeft: 15
  },
  inputs:{
      width: "100%",
      alignItems: 'center',
      marginTop: "15%"
  }
})