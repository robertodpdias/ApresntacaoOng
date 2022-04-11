import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, Image, TextInput, Text, TouchableOpacity, ToastAndroid, StatusBar} from 'react-native';

import global from "../../Global/Style"
import SelectMultiple from 'react-native-select-multiple'
import { Ionicons, Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import { Camera } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';
import compress from 'compress-base64';

import * as FileSystem from 'expo-file-system';

export default function CadastrarAssistido({navigation}){
    const camRef = useRef(null);
    const[permission, setPermission] = useState(null);
    const[type, setType] = useState(Camera.Constants.Type.back);
    const[cam, setCam] = useState(false);

    const[selected, setSelected] = useState([]);
    const[comorbidade, setComorbidade] = useState([]);
    const[dorgas, setDorgas] = useState([]);
    const[idFunc, setIdFunc] = useState();
    const[nome, setNome] = useState("");
    const[nomeSocial, setNomeSocial] = useState("");
    const[rg, setRg] = useState("");
    const[cpf, setCpf] = useState("");
    const[antCriminal, setAntCriminal] = useState("");
    const[sexo,setSexo] = useState("");
    const[nascimento, setNascimento] = useState("");
    const[estdCivil, setEstdCivil] = useState("");
    const[naturalidade, setNaturalidade] = useState("");
    const[cartCid, setCartCid] = useState("");
    const[cartSus, setCartSus] = useState("");
    const[foto, setFoto] = useState("");

    const onSelectionsChange = (selected) => {
        setSelected(selected);
    }

    const limpar = () => {
        setNome("");
        setNomeSocial("");
        setRg("");
        setCpf("");
        setAntCriminal("");
        setSexo("");
        setNascimento("");
        setEstdCivil("");
        setNaturalidade("");
        setCartCid("");
        setCartSus("");
        setSelected([]);
        setFoto("");
    }

    const getFunc =  async() => {
        let value = await AsyncStorage.getItem('userdata');
        let id = JSON.parse(value)
        setIdFunc(id.id_funcionario)
    }

    const cadastrar = () => {
        let ano = nascimento.split('/')[2]
        let mes = nascimento.split('/')[1]
        let dia = nascimento.split('/')[0]
        
        let assistido = {
            id_funcionario: idFunc,
            nome_completo: nome,
            nome_social: nomeSocial,
            rg: rg,
            cpf: cpf,
            antecedente_criminal: antCriminal,
            data_nascimento: `${ano}-${mes}-${dia}`,
            estado_civil: estdCivil,
            naturalidade: naturalidade,
            sexo: sexo,
            cartao_cidadao: cartCid,
            cartao_sus: cartSus,
            foto: foto
        }

        // fetch(`http://10.87.207.27:3000/assistidos`, {
        // fetch(`http://192.168.137.1:3000/assistidos`, {
        fetch(`http://192.168.0.29:3000/assistidos`, {
          "method": "POST",
          "headers": {
              "Content-Type": "application/json"
          },
          "body": JSON.stringify(assistido),
        })
        .then(resp => {return resp.json()})
        .then(async data => {
            if(data.err !== undefined) {
                if(data.err.includes("Duplicate entry"))
                    ToastAndroid.show('CPF já existente!', ToastAndroid.SHORT)
            } else {

                let saude = {
                    id_assistido: data.id_assistido,
                    comorbidades: selected
                }

                // fetch(`http://10.87.207.27:3000/assistido/saude`, {
                // fetch(`http://192.168.137.1:3000/assistido/saude`, {
                fetch(`http://192.168.0.29:3000/assistido/saude`, {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": JSON.stringify(saude),
                })
                .then(resp => {return resp.json()})
                .then(async data => {
                    ToastAndroid.show('Cadastro Efetuado!', ToastAndroid.SHORT)
                    limpar()
                    console.log(data)
                })
            }
        })
        .catch(err => {
            console.log(err) 
        });
    }

    const renderLabel = (label, style) => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginLeft: 5}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>{label}</Text>
                </View>
            </View>
        )
    }

      useFocusEffect(
        React.useCallback(() => {
            // fetch(`http://10.87.207.27:3000/assistido/comorbidade`)
            // fetch(`http://192.168.137.1:3000/assistido/comorbidade`)
            fetch(`http://192.168.0.29:3000/assistido/comorbidade`)
            .then(resp => {return resp.json()})
            .then(async data => {
                let temp = JSON.stringify(data);
                temp = temp.replace(/id_comorbidade/g, "value");
                temp = temp.replace(/comorbidade/g, "label");
                temp = JSON.parse(temp);
    
                let tempC = [], tempD = [];
    
                temp.forEach(item => {
                    if(item.tipo == 1) {
                        tempC.push(item);
                    }else {
                        tempD.push(item);
                    }
                })
                
                setComorbidade(tempC);
                setDorgas(tempD);
            })
            .catch(err => { console.log(err) });
        }, [])
      );

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
        <View style={global.body} onLoad={getFunc()}>
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
                            <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5, marginTop: "10%"}} size={35} color="#166B8A" onPress={() => {navigation.navigate("CadastrarAssistido")}} />
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
                                <Text style={css.title1}>Dados Pessoais</Text>
                                <TextInput value={nome} onChangeText={setNome} placeholder="Nome..." place style={global.info}></TextInput>
                                <TextInput value={nomeSocial} onChangeText={setNomeSocial} placeholder="Nome social..." place style={global.info}></TextInput>
                                <TextInput value={rg} onChangeText={setRg} placeholder="RG..." style={global.info}></TextInput>
                                <TextInput value={cpf} onChangeText={setCpf} placeholder="CPF..." style={global.info}></TextInput>
                                <TextInput value={antCriminal} onChangeText={setAntCriminal} placeholder="Antecedente criminal..." style={global.info}></TextInput>
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
                                <TextInput value={nascimento} onChangeText={setNascimento} placeholder="Nascimento..." style={global.info}></TextInput>
                                <TextInput value={estdCivil} onChangeText={setEstdCivil} placeholder="Estado civil..." style={global.info}></TextInput>
                                <TextInput value={naturalidade} onChangeText={setNaturalidade} placeholder="Naturalidade..." style={global.info}></TextInput>
                                <TextInput value={cartCid} onChangeText={setCartCid} placeholder="Cartão cidadão..." style={global.info}></TextInput>
                                <TextInput value={cartSus} onChangeText={setCartSus} placeholder="Cartão do SUS..." style={global.info}></TextInput>
                                <Text style={css.title1}>Doenças</Text>
                                <View style={{flex: 1, width: '90%', height: 100, alignItems: "center", alignSelf: "center"}}>
                                        <SelectMultiple
                                            items={comorbidade}
                                            renderLabel={renderLabel}
                                            selectedItems={selected}
                                            onSelectionsChange={onSelectionsChange}
                                            />
                                </View>
                                <Text style={css.title2}>Psicoativos</Text>
                                <View style={css.select}>
                                        <SelectMultiple
                                            items={dorgas}
                                            renderLabel={renderLabel}
                                            selectedItems={selected}
                                            onSelectionsChange={onSelectionsChange}
                                            />
                                </View>
                                <View style={css.align}>
                                    {
                                        ( foto === null || foto === undefined || foto === "") ?
                                            <Image source={require("../../assets/user1.png")} style={global.imageUser}/>
                                        :
                                            <Image source={{"uri":foto}} style={global.imageUser}/>
                                    }
                                    <TouchableOpacity style={css.alignIcon} onPress={() => {setCam(true)}}>
                                        <Feather name="camera" size={24} color="blue" style={{marginRight: 10}}/>
                                        <Text style={{color: "blue", fontSize: 15, fontWeight: "bold"}}>Nova foto</Text>
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
    title1:{
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: "5%"
    },
    title2:{
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginBottom: "5%"
    },
    align: {
        width: "80%",
        height: 150,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        alignSelf: "center"
    },
    alignIcon: {
        alignItems: "center",
        flexDirection: "row",
        marginBottom: "10%"
    },
    select: {
        flex: 1,
        width: '85%',
        height: 50,
        alignItems: "center",
        alignSelf: "center"
    },
    buttons:{
      width: "17%",
      height: "100%",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "rgba(100, 100, 100, 0.31)",
      borderRadius: 50
    },
    body2:{
        width: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: "column"
    }
})