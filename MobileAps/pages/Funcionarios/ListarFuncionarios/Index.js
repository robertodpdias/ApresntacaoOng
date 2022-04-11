import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';

import global from "../../Global/Style"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useFocusEffect, CommonActions  } from '@react-navigation/native';

export default function ListarFuncionario({navigation}){
    const[lista, setLista] = useState([]);
    const[searchText, setSearchText] = useState("");
    const [dados, setDados] = useState([]);
    const[ativo, setAtivo] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            // fetch(`http://10.87.207.27:3000/funcionarios`)
            // fetch(`http://192.168.137.1:3000/funcionarios`)
            fetch(`http://192.168.0.29:3000/funcionarios`)
            .then(resp => {return resp.json()})
            .then(data => {
                setLista(data);
                setDados(data);
            })
            .catch(err => { console.log(err) });
        }, [])
    );
    
    useEffect(() => {
        if (searchText === ''){
            setLista(dados);
        } else {
            setLista(
                dados.filter(item => (item.nome_completo.toLowerCase().indexOf(searchText.toLowerCase()) > -1))
            )
        }
    }, [searchText]);

    const listar = () => {
        let newDados = [...dados];

        newDados.sort((a, b) => (a.nome_completo > b.nome_completo) ? 1 : (b.nome_completo > a.nome_completo ? -1 : 0));

        setLista(newDados)
    }

    const ativos = () => {
        setAtivo(!ativo)
    }

    return(
        <View style={global.body}>
            <StatusBar
                barStyle = "dark-content"
                hidden = {false}
                backgroundColor="transparent"
                translucent={true}/>
            <View style={{width: "100%", height: 150, backgroundColor: "#166B8A", borderBottomRightRadius: 40, borderBottomLeftRadius: 40}}>
                <View style={css.filter}>
                    <Ionicons name="arrow-back-circle-outline" size={34} color="white" onPress={() => {navigation.navigate("Home")}} />
                    <TextInput placeholder="Pesquisar..." placeholderTextColor= "white" style={{width: "80%", borderBottomWidth: 1, borderBottomColor: 'white', padding: "2%", color: 'white'}} value={searchText} onChangeText={(t) => setSearchText(t)}></TextInput>
                </View>
                <View style={{width: "90%", alignItems: "center", alignSelf: "center", height: "50%", justifyContent: "space-between",flexDirection: "row"}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Filtrar por:</Text>
                    <TouchableOpacity style={{height: "100%", alignItems: "center", justifyContent: "center"}} onPress={() => {listar()}}>
                        {/* <MaterialCommunityIcons name="order-alphabetical-ascending" size={30} color="white" /> */}
                        <Text style={{fontSize: 18, color: 'white'}}>A-Z</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height: "100%", alignItems: "center", justifyContent: "center"}} onPress={() => {ativos()}}>
                        <Text style={{fontSize: 18, color: 'white'}}>Atividade</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={css.scrollAlternative}>
                <ScrollView>
                    {
                        lista.map((item,index) => {
                            return(
                                <View key={index}>
                                {
                                    (ativo === true && item.status === 0)
                                    ? 
                                    <TouchableOpacity style={{display: 'none'}}></TouchableOpacity> 
                                    :
                                    <TouchableOpacity style={global.cardInfo} onPress={async () => {
                                        await AsyncStorage.setItem("funcionario", JSON.stringify(item.matricula));
                                        navigation.navigate("VerFuncionario")
                                        }}>
                                        <Image source={(item.foto === null || item.foto === "" || item.foto === "undefined") ? require("../../assets/user1.png") : {uri: item.foto}} style={global.imageUser}/>
                                        <View style={global.cardTxt}>
                                            <Text style={global.textInfo}>{item.nome_completo}</Text>
                                            <Text style={css.activity}>{(item.status === 0) ? "Inativo" : "Ativo"}</Text>
                                        </View>
                                    </TouchableOpacity> 
                                }
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}
const css = StyleSheet.create({
    activity: {
        fontSize: 18,
        fontWeight: "bold"
    },
    filter:{
        width: "100%",
        height: "30%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignSelf: "flex-end",
        marginTop: "8%",
        marginBottom: "1%"
      },
      scrollAlternative:{
        width: "100%",
        height: "80%"
      }
})