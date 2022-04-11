import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TextInput, ToastAndroid, StatusBar} from 'react-native';

import global from "../../Global/Style"
import { Ionicons, Feather} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect, CommonActions  } from '@react-navigation/native';

export default function VerFuncionario({navigation, route}){
    // const {item} = route.params;

    const[atualizar, setAtualizar] = useState(false);
    const[funcionario, setFuncionario] = useState([]);
    const[matricula, setMatricula] = useState("")
    const[cargo, setCargo] = useState("");
    const[dataDemissao, setDataDemissao]= useState("");

    const formatDate = (nasc) => {
        let dia = nasc.getDate();
        dia = (dia < 10) ? "0" + dia : dia;
        let mes = nasc.getMonth() + 1;
        mes = (mes < 10) ? "0" + mes : mes;
        let ano = nasc.getFullYear();
        return `${dia}/${mes}/${ano}`;
     }

     const Atualizar = () => {
        
        if(dataDemissao !== null){
            var anoDem = dataDemissao.split('/')[2]
            var mesDem = dataDemissao.split('/')[1]
            var diaDem = dataDemissao.split('/')[0]

            var funcionario = {
                matricula_funcionario: matricula,
                cargo: cargo,
                data_demissao: `${anoDem}-${mesDem}-${diaDem}`,
            }
        } else {
            var funcionario = {
                matricula_funcionario: matricula,
                cargo: cargo,
                data_demissao: dataDemissao,
            }
        }

        // fetch(`http://10.87.207.27:3000/funcionario`, {
        // fetch(`http://192.168.137.1:3000/funcionario`, {
        fetch(`http://192.168.0.29:3000/funcionarios`, {
          "method": "PUT",
          "headers": {
              "Content-Type": "application/json"
          },
          "body": JSON.stringify(funcionario),
        })
        .then(resp => {return resp.json()})
        .then(data => {
            setMatricula("")
            setCargo("")
            setDataDemissao("")
            ToastAndroid.show('Funcionário atualizado!', ToastAndroid.SHORT)
            setAtualizar(false)
            readStorage()
        })
        .catch(err => {
            console.log(err) 
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            readStorage();
        }, [])
    );

    const readStorage = async () => {
        let funcionario = JSON.parse(await AsyncStorage.getItem("funcionario"));

        fetch(`http://192.168.0.29:3000/funcionarios/${funcionario}`)
        // fetch(`http://10.87.207.27:3000/funcionarios/${funcionario}`)
        // fetch(`http://192.168.137.1:3000/funcionarios/${funcionario}`)
        .then(resp => {return resp.json()})
        .then(data => {
            setFuncionario(data[0]);
            setDataDemissao(formatDate(new Date()));
            setCargo(data[0].cargo);
            setMatricula(data[0].matricula);
            
        })
        .catch(err => { console.log(err) });
    }

    return(
        <View style={global.body}>
            {
                (atualizar !== true) ?
                <View style={css.body2}>
                    <StatusBar
                        barStyle = "dark-content"
                        hidden = {false}
                        backgroundColor="transparent"
                        translucent={true}/>
                    <View style={global.headerFunc}>
                        <View style={global.alignHeader}>
                            <Ionicons name="arrow-back-circle-outline" style={css.icon} size={35} color="#166B8A" onPress={() => {navigation.navigate('ListarFuncionario')}} />
                            <Image source={(funcionario.foto === "null" || funcionario.foto === "" || funcionario.foto === "undefined") ? require("../../assets/user1.png") : {uri: funcionario.foto}} style={global.imageUser}/>
                        </View>
                        <View style={global.cardTitle}>
                            <Text style={global.textTitle}>CASA ACOLHEDORA</Text>
                            <Text style={global.textTitle}>IRMÃ ANTÔNIA</Text>
                        </View>
                    </View>
                    <View style={css.scroll}>
                        <ScrollView>
                            <View style={global.info}>
                                <Text style={global.textInfo1}>Nome:</Text>
                                <Text style={global.textInfo}>{funcionario.nome_completo}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo1}>Matricula:</Text>
                                <Text style={global.textInfo}>{funcionario.matricula}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo1}>RG:</Text>
                                <Text style={global.textInfo}>{funcionario.rg}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo1}>CPF:</Text>
                                <Text style={global.textInfo}>{funcionario.cpf}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo1}>Nascimento:</Text>
                                <Text style={global.textInfo}>{formatDate(new Date(funcionario.data_nascimento))}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo1}>Cargo:</Text>
                                <Text style={global.textInfo}>{funcionario.cargo}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo1}>Sexo:</Text>
                                <Text style={global.textInfo}>{funcionario.sexo}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo1}>E-mail:</Text>
                                <Text style={global.textInfo}>{funcionario.email}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo1}>Data admissão:</Text>
                                <Text style={global.textInfo}>{formatDate(new Date(funcionario.data_admissao))}</Text>
                            </View>
                            {
                                (funcionario.data_demissao !== null)
                                ?
                                    <View style={global.info}>
                                        <Text style={global.textInfo1}>Data demissão:</Text>
                                        <Text style={global.textInfo}>{formatDate(new Date(funcionario.data_demissao))}</Text>
                                    </View>
                                :
                                <TouchableOpacity style={css.cardButton1} onPress={() => {setAtualizar(true)}}>
                                    <Text style={global.buttonText1}>ATUALIZAR</Text>
                                </TouchableOpacity>
                            }
                        </ScrollView>
                    </View>
                </View>
                :
                <View style={css.body2}>
                    <View style={global.header}>
                        <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5}} size={35} color="#166B8A" onPress={() => {setAtualizar(false)}} />
                        <View style={global.cardTitle}>
                            <Text style={global.textTitle}>Casa Acolhedora</Text>
                            <Text style={global.textTitle}>Irmã Antônia</Text>
                        </View>
                    </View>
                    <View style={{width: "100%", height: "80%", justifyContent: "space-evenly"}}>
                        <TextInput value={cargo} onChangeText={setCargo} placeholder="Cargo..." style={global.info}></TextInput>
                        <TextInput value={matricula} onChangeText={setMatricula} placeholder="Matricula..." style={global.info}></TextInput>
                        <TextInput value={dataDemissao} onChangeText={setDataDemissao} placeholder="Data demissão..." style={global.info}></TextInput>
                        <TouchableOpacity style={css.cardButton1} onPress={() => {Atualizar()}}>
                            <Text style={global.buttonText1}>SALVAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            
        </View>
    )
}

const css = StyleSheet.create({
    scroll:{
        width: '100%',
        height: '70%',
    },
    body2:{
        width: "100%",
        height: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: "column",
        
    },
    cardButton1: {
      backgroundColor: "rgb(22,107,138)",
      width: "35%",
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      alignSelf: "center",
      marginTop: 20,
      marginBottom: 20
    }
})