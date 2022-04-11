import React, {useState, useEffect , useRef } from 'react';
import { StyleSheet, View, ScrollView, Image, TextInput, Text, TouchableOpacity, ToastAndroid, StatusBar} from 'react-native';

import global from "../../Global/Style"
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import {Picker} from '@react-native-picker/picker';

export default function CadastrarFuncionario({navigation}){
    const camRef = useRef(null);
    const[permission, setPermission] = useState(null);
    const[type, setType] = useState(Camera.Constants.Type.back);
    const[cam, setCam] = useState(false);
    const[mostrar1, setMostrar1] = useState(true);

    const[nome, setNome] = useState("");
    const[matricula, setMatricula] = useState("")
    const[rg, setRg] = useState("");
    const[cpf, setCpf] = useState("");
    const[estdCivil, setEstdCivil] = useState("");
    const[sexo,setSexo] = useState("");
    const[email,setEmail] = useState("");
    const[senha,setSenha] = useState("");
    const[cargo, setCargo] = useState("");
    const[nascimento, setNascimento] = useState("");
    const[dataAdmissao, setDataAdmissao]= useState("");
    const[foto, setFoto] = useState("");

    const limpar = () => {
        setNome("");
        setRg("");
        setCpf("");
        setSexo("");
        setNascimento("");
        setCargo("");
        setDataAdmissao("");
        setEmail("");
        setSenha("");
        setFoto("");
        setMatricula("");
        setEstdCivil("")
           
    }

    const cadastrar = () => {
        let anoNasc = nascimento.split('/')[2]
        let mesNasc = nascimento.split('/')[1]
        let diaNasc = nascimento.split('/')[0]

        let anoAdm = nascimento.split('/')[2]
        let mesAdm = nascimento.split('/')[1]
        let diaAdm = nascimento.split('/')[0]
        
        let funcionario = {
            nome_completo: nome,
            matricula: matricula,
            rg: rg,
            cpf: cpf,
            data_nascimento: `${anoNasc}-${mesNasc}-${diaNasc}`,
            estado_civil: estdCivil,
            sexo: sexo,
            cargo: cargo,
            email: email,
            senha: senha,
            data_admissao: `${anoAdm}-${mesAdm}-${diaAdm}`,
            foto: foto
        }
    
        // fetch(`http://10.87.207.27:3000/funcionario`, {
        // fetch(`http://192.168.137.1:3000/funcionario`, {
        fetch(`http://192.168.0.29:3000/funcionario`, {
          "method": "POST",
          "headers": {
              "Content-Type": "application/json"
          },
          "body": JSON.stringify(funcionario),
        })
        .then(resp => {return resp.json()})
        .then(data => {
            console.log(data)
            if(data.err !== undefined) {
                if(data.err.includes("Duplicate entry"))
                    ToastAndroid.show('CPF já existente!', ToastAndroid.SHORT)
            } else {
                ToastAndroid.show('Cadastro Efetuado!', ToastAndroid.SHORT)
                limpar()
            }
        })
        .catch(err => {
            console.log(err) 
        });
    }

    useEffect(() => {
        (async () => {
          const {status} = await Camera.requestCameraPermissionsAsync();
          setPermission(status === 'granted');
        })();
      }, []);
    
      if(permission === null){
        return <View/>;
      }
    
      if(permission === false){
        return <Text> Acesso negado!</Text>;
      }
    
      async function takePicture(){
        if(camRef){
            const data = await camRef.current.takePictureAsync();
            let base = await FileSystem.readAsStringAsync(data.uri, {
            encoding: FileSystem.EncodingType.Base64,
            });

            let url = data.uri.split(".");
            let b64 = `data:image/${url[url.length-1]};base64,${base}`;

            setFoto(b64)
            setCam(false)
        }
    }

    return(
        <View style={global.body}>
            <StatusBar
                        barStyle = "dark-content"
                        hidden = {false}
                        backgroundColor="transparent"
                        translucent={true}/>
            {
                (cam === true)
                ?
                    <View style={{width: "100%", height: "100%", justifyContent: 'center'}}>
                        <Camera style={{flex: 1}} type={type} ref={camRef}>
                            <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5, marginTop: 20}} size={35} color="#166B8A" onPress={() => {navigation.navigate("CadastrarFuncionario")}} />
                            <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: "row"}}>
                                <View style={{width: '100%', height: '10%', position: 'absolute', bottom: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',marginBottom: "2%"}}>
                                    <TouchableOpacity style={css.buttons} onPress={() => {
                                        setType(
                                            type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back
                                            )
                                            }}
                                    >
                                        <Ionicons name="md-camera-reverse-outline" size={30} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={takePicture} style={css.buttons}>
                                        <MaterialCommunityIcons name="camera-iris" size={50} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Camera>
                    </View>
                :
                <View style={css.body2}>
                    <View style={global.header}>
                        <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5}} size={35} color="#166B8A" onPress={() => {navigation.navigate('Home'), limpar()}} />
                        <View style={global.cardTitle}>
                            <Text style={global.textTitle}>Casa Acolhedora</Text>
                            <Text style={global.textTitle}>Irmã Antônia</Text>
                        </View>
                    </View>
                    <View style={global.scroll}>
                        <ScrollView>
                            <TextInput value={nome} onChangeText={setNome} placeholder="Nome..." place style={global.info}></TextInput>
                            <TextInput value={matricula} onChangeText={setMatricula} placeholder="Matricula..." style={global.info}></TextInput>
                            <TextInput value={rg} onChangeText={setRg} placeholder="RG..." style={global.info}></TextInput>
                            <TextInput value={cpf} onChangeText={setCpf} placeholder="CPF..." style={global.info}></TextInput>
                            <TextInput value={nascimento} onChangeText={setNascimento} placeholder="Nascimento..." style={global.info}></TextInput>
                            <TextInput value={cargo} onChangeText={setCargo} placeholder="Cargo..." style={global.info}></TextInput>
                            <View style={{width: "90%", alignSelf: "center", borderBottomWidth: 2}}>
                                    <Picker
                                        selectedValue={sexo}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSexo(itemValue)
                                        }>
                                        <Picker.Item label="Sexo..." value="" style={{color: "gray"}}/>
                                        <Picker.Item label="Feminino" value="Feminino" />
                                        <Picker.Item label="Masculino" value="Masculino" />
                                        <Picker.Item label="Outro" value="Outro" />
                                    </Picker>
                            </View>
                            <TextInput value={dataAdmissao} onChangeText={setDataAdmissao} placeholder="Data admissão..." style={global.info}></TextInput>
                            <TextInput value={email} onChangeText={setEmail} placeholder="E-mail..." style={global.info}></TextInput>
                            <View style={global.info}>
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
                            <View style={{flexDirection: "row", alignSelf: "center", marginTop: "5%", marginBottom: "5%"}}>
                                {
                                    ( foto === null || foto === undefined || foto === "") ?
                                        <Image source={require("../../assets/user1.png")} style={global.imageUser}/>
                                    :
                                        <Image source={{"uri":foto}} style={global.imageUser}/>
                                }
                                <TouchableOpacity onPress={() => {setCam(true)}} style={css.imageAlign}>
                                    <Feather name="camera" size={24} color="blue" />
                                    <Text style={{color: "blue"}}>Adicionar foto</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={global.cardButton1} onPress={() => {cadastrar()}}>
                                <Text style={global.buttonText1}>SALVAR</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            }
        </View>
    )
}

const css = StyleSheet.create({
    imageAlign:{
        width: 110,
        height: 100,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    body2:{
        width: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: "column"
    }
})