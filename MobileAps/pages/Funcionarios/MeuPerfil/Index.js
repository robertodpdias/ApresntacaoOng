import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView} from 'react-native';

import global from "../../Global/Style"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function MeuPerfil({navigation}){
    const [funcionario, setFuncionario] = useState({});

    useEffect(() => {
        getUser()
    }, []);

    const getUser = async () => {
        let value = await AsyncStorage.getItem('userdata');
        if(value !== null) {
            value = JSON.parse(value);
            fetch(`http://192.168.0.29:3000/funcionarios/${value}`)
            // fetch(`http://192.168.137.1:3000/funcionarios/${value.matricula}`)
            // fetch(`http://10.87.207.27:3000/funcionarios/${value.matricula}`)
            .then(resp => {return resp.json()})
            .then(data => {
                setFuncionario(data[0])
            })
            .catch( err => { console.log(err) })
        }
     }

    const formatDate = (nasc) => {
        let dia = nasc.getDate();
        dia = (dia < 10) ? "0" + dia : dia;
        let mes = nasc.getMonth() + 1;
        mes = (mes < 10) ? "0" + mes : mes;
        let ano = nasc.getFullYear();
        return `${dia}/${mes}/${ano}`;
     }

    return(
        <View style={global.body}>
            <View style={global.headerFunc}>
                <View style={global.alignHeader}>
                    <Ionicons name="arrow-back-circle-outline" style={css.icon} size={35} color="#166B8A" onPress={() => {navigation.navigate('Home')}} />
                    <Image source={(funcionario.foto === null || funcionario.foto === "") ? require("../../assets/user.png") : {uri: funcionario.foto}} style={global.imageUser}/>
                </View>
                <View style={global.cardTitle}>
                    <Text style={global.textTitle}>CASA ACOLHEDORA</Text>
                    <Text style={global.textTitle}>IRMÃ ANTÔNIA</Text>
                </View>
            </View>
            <View style={global.scroll}>
                <ScrollView>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nome:</Text>
                        <Text style={global.textInfo}>{funcionario.nome_completo}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Matrícula:</Text>
                        <Text style={global.textInfo}>{funcionario.matricula}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>RG:</Text>
                        <Text style={global.textInfo}>{funcionario.rg}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>CPF:</Text>
                        <Text style={global.textInfo}>{funcionario.cpf}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nascimento:</Text>
                        <Text style={global.textInfo}>{formatDate(new Date(funcionario.data_nascimento))}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Cargo:</Text>
                        <Text style={global.textInfo}>{funcionario.cargo}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Sexo:</Text>
                        <Text style={global.textInfo}>{funcionario.sexo}</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Data admissão:</Text>
                        <Text style={global.textInfo}>{formatDate(new Date(funcionario.data_admissao))}</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
})