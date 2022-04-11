import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TextInput, TouchableOpacity, ToastAndroid, StatusBar} from 'react-native';

import global from "../../Global/Style"
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import { useFocusEffect, CommonActions  } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from  "lottie-react-native";

export default function VerAssistido({navigation, route}){ 
    const formatDate = (nasc) => {
        let dia = nasc.getDate();
        dia = (dia < 10) ? "0" + dia : dia;
        let mes = nasc.getMonth() + 1;
        mes = (mes < 10) ? "0" + mes : mes;
        let ano = nasc.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    const[assistido, setAssistido] = useState([]) 

    const[editar, setEditar] = useState(false)
    const[familiar, setFamiliar] = useState(false)

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
    const[foto, setFoto] = useState(assistido.foto_depois);
    const[comorbidade, setComorbidade] = useState([]);

    const[DadosFamiliar, setDadosFamiliar] = useState([])
    const[nomeFamiliar, setNomeFamiliar] = useState("");
    const[rgFamiliar, setRgFamiliar] = useState("");
    const[parentescoFamiliar, setParentescoFamiliar] = useState("");
    const[emailFamiliar, setEmailFamiliar] = useState("");
    const[telefoneFamiliar, setTelefoneFamiliar] = useState("");
    const[enderecoFamiliar, setEnderecoFamiliar] = useState("");


    useFocusEffect(
        React.useCallback(() => {
            readStorage();
            carregarFam();
            carregarCom();
        }, [])
    );

    const readStorage = async () => {
        let assistido = JSON.parse(await AsyncStorage.getItem("assistido"));

        fetch(`http://192.168.0.29:3000/assistidos/${assistido}`)
        // fetch(`http://10.87.207.27:3000/assistidos/${assistido}`)
        // fetch(`http://192.168.137.1:3000/assistidos/${assistido}`)
        .then(resp => {return resp.json()})
        .then(data => {
            setAssistido(data);
            setNome(data.nome_completo);
            setNomeSocial(data.nome_social);
            setRg(data.rg);
            setCpf(data.cpf);
            setAntCriminal(data.antecedente_criminal);
            setEstdCivil(data.estado_civil);
            setNaturalidade(data.naturalidade);
            setCartCid(data.cartao_cidadao);
            setCartSus(data.cartao_sus);
            setNascimento(formatDate(new Date(data.data_nascimento)));
            setSexo(data.sexo);
        })
        .catch(err => { console.log(err) });
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

        setDadosFamiliar([])
        setNomeFamiliar("");
        setRgFamiliar("");
        setParentescoFamiliar("");
        setEmailFamiliar("");
        setTelefoneFamiliar("");
        setEnderecoFamiliar("");
    }

    const editarDados = () => {
        setEditar(true)
    }
    
    const salvarEdicao = () => {
            let ano = nascimento.split('/')[2]
            let mes = nascimento.split('/')[1]
            let dia = nascimento.split('/')[0]
            
            let Assistido = {
                id_assistido: assistido.id_assistido,
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
                foto_depois: foto
            }
            
            fetch(`http://192.168.0.29:3000/assistido/update`, {
            // fetch(`http://10.87.207.27:3000/assistido/update`, {
            // fetch(`http://192.168.137.1:3000/assistidos`, {
              "method": "PUT",
              "headers": {
                  "Content-Type": "application/json"
              },
              "body": JSON.stringify(Assistido),
            })
            .then(resp => {return resp.json()})
            .then(data => {
                ToastAndroid.show('Atualizado!', ToastAndroid.SHORT)
                limpar()
                setEditar(false)
                readStorage()
                carregarFam()
            })
            .catch(err => {
                console.log(err) 
            });
    }

    const cadastrarFamiliar = () => {
        let familiar = {
            id_assistido: assistido.id_assistido,
            nome_completo: nomeFamiliar,
            rg: rgFamiliar,
            telefone: telefoneFamiliar,
            email: emailFamiliar,
            parentesco: parentescoFamiliar,
            endereco: enderecoFamiliar
        }

        fetch(`http://192.168.0.29:3000/assistido/familiar`, {
        // fetch(`http://192.168.137.1:3000/assistido/familiar`, {
        // fetch(`http://10.87.207.27:3000/assistido/familiar`, {
          "method": "POST",
          "headers": {
              "Content-Type": "application/json"
          },
          "body": JSON.stringify(familiar),
        })
        .then(resp => {return resp.json()})
        .then(data => {
            limpar()
            setFamiliar(false)
            carregarFam()
        })
        .catch(err => { console.log(err) });
    }

    const carregarFam = async () => {
        let idAs = JSON.parse(await AsyncStorage.getItem("assistido"));
        fetch(`http://192.168.0.29:3000/assistido/busca_familiar/${idAs}`)
        // fetch(`http://192.168.137.1:3000/assistido/busca_familiar/${idAs}`)
            // fetch(`http://10.87.207.27:3000/assistido/busca_familiar/${idAs}`)
            .then(resp => {return resp.json()})
            .then(data => {
                setDadosFamiliar(data)
            })
            .catch(err => {
                console.log(err) 
            });
    }

    const carregarCom = async () => {
        let idAs = JSON.parse(await AsyncStorage.getItem("assistido"));
        // fetch(`http://192.168.137.1:3000/assistido/saudeID/${idAs}`)
            // fetch(`http://10.87.207.27:3000/assistido/saudeID/${idAs}`)
            fetch(`http://192.168.0.29:3000/assistido/saudeID/${idAs}`)
            .then(resp => {return resp.json()})
            .then(data => {
                setComorbidade(data)
            })
            .catch(err => {
                console.log(err) 
            });
    }

    return(
        <View style={global.body}>
            <StatusBar
                barStyle = "dark-content"
                hidden = {false}
                backgroundColor="transparent"
                translucent={true}/>
            <View style={global.header}>
                <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5}} size={35} color="#166B8A" onPress={() => {
                    navigation.dispatch(
                        CommonActions.navigate({
                          name: 'ListarAssistidos',
                          params: {},
                        })
                      );
                    //navigation.navigate('')
                }} />
                <View style={global.cardTitle}>
                        <Text style={global.textTitle}>CASA ACOLHEDORA</Text>
                        <Text style={global.textTitle}>IRMÃ ANTÔNIA</Text>
                </View>
            </View>
            <View style={global.scroll}>
                <ScrollView>
                    {
                        (editar === false)
                        ?
                        <View>
                            <View style={css.images}>
                                <View>
                                    <Image source={(assistido.foto_antes !== "null" && assistido.foto_antes !== "undefined" && assistido.foto_antes !== "") ? {uri:assistido.foto_antes} : require("../../assets/user1.png")} style={global.imageUser}/>
                                    <Text style={css.title}>Antes</Text>
                                </View>
                                <View>
                                    <Image source={(assistido.foto_depois !== "null" && assistido.foto_depois !== "undefined" && assistido.foto_depois !== "") ? {uri:assistido.foto_depois} : require("../../assets/user1.png")} style={global.imageUser}/>
                                    <Text style={css.title}>Depois</Text>
                                </View>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Nome:</Text>
                                <Text style={global.textInfo}>{assistido.nome_completo}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Nome social:</Text>
                                <Text style={global.textInfo}>{assistido.nome_social}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>RG:</Text>
                                <Text style={global.textInfo}>{assistido.rg}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>CPF:</Text>
                                <Text style={global.textInfo}>{assistido.cpf}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Nascimento:</Text>
                                <Text style={global.textInfo}>{formatDate(new Date(assistido.data_nascimento))}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Naturalidade:</Text>
                                <Text style={global.textInfo}>{assistido.naturalidade}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Sexo:</Text>
                                <Text style={global.textInfo}>{assistido.sexo}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Estado civíl:</Text>
                                <Text style={global.textInfo}>{assistido.estado_civil}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Cartão cidadão:</Text>
                                <Text style={global.textInfo}>{assistido.cartao_cidadao}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Cartão do SUS:</Text>
                                <Text style={global.textInfo}>{assistido.cartao_sus}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Antecedente:</Text>
                                <Text style={global.textInfo}>{assistido.antecedente_criminal}</Text>
                            </View>
                            <Text style={css.title}>Psicoativos:</Text>
                            {
                                comorbidade.map((item, index) => {
                                    return(
                                        <View key={index}>
                                            {
                                                (item.tipo === 0) ?
                                                    <View style={global.info}>
                                                        <Text style={global.textInfo}>{item.comorbidade}</Text>
                                                    </View>
                                                :
                                                    <View style={{display: 'none'}}></View>
                                            }
                                        </View>
                                    )
                                })
                            }
                            <Text style={css.title}>Comorbidades:</Text>
                            {
                                comorbidade.map((item, index) => {
                                    return(
                                        <View key={index}>
                                            {
                                                (item.tipo === 1 && item.tipo !== 0) ?
                                                    <View style={global.info}>
                                                        <Text style={global.textInfo}>{item.comorbidade}</Text>
                                                    </View>
                                                :
                                                    <View style={{display: 'none'}}></View>
                                            }
                                        </View>
                                    )
                                })
                            }
                            <TouchableOpacity style={css.button} onPress={() => {editarDados()}}>
                                <Text style={global.buttonText1}>Editar dados</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View>
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
                            <View style={{alignItems: 'center', justifyContent: 'space-evenly', flexDirection: "row", marginBottom: 15}}>
                                <TouchableOpacity onPress={() => {setEditar(false)}} style={{alignItems: 'center', justifyContent: 'center', width: "35%", height: 45,  marginTop: 20}}>
                                    <Text style={{fontSize:18, color: "#166B8A", fontWeight: "bold"}}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[css.button, { marginBottom: 20}]} onPress={() => {salvarEdicao()}}>
                                    <Text style={global.buttonText1}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    <Text style={{fontWeight: 'bold', fontSize:18, alignSelf: 'center', color: "#166B8A", marginTop:"-5%"}}>Dados do Familiar</Text>
                    <View style={{width: "100%", minHeight: 20}}>
                        <ScrollView horizontal>
                        {
                            ( DadosFamiliar.length !== 0)
                            ?
                            DadosFamiliar.map((item, index) => {
                                return(
                                    <View key={index} style={{width: 370, height: 350}}>
                                        <View style={global.info}>
                                            <Text style={global.textInfo}>Nome:</Text>
                                            <Text style={global.textInfo}>{item.nome_familiar}</Text>
                                        </View>
                                        <View style={global.info}>
                                            <Text style={global.textInfo}>Parentesco:</Text>
                                            <Text style={global.textInfo}>{item.parentesco}</Text>
                                        </View>
                                        <View style={global.info}>
                                            <Text style={global.textInfo}>RG:</Text>
                                            <Text style={global.textInfo}>{item.rg_familiar}</Text>
                                        </View>
                                        <View style={global.info}>
                                            <Text style={global.textInfo}>Telefone:</Text>
                                            <Text style={global.textInfo}>{item.telefone_familiar}</Text>
                                        </View>
                                        <View style={global.info}>
                                            <Text style={global.textInfo}>E-mail:</Text>
                                            <Text style={global.textInfo}>{item.email_familiar}</Text>
                                        </View>
                                        <View style={global.info}>
                                            <Text style={global.textInfo}>Endereço:</Text>
                                            <Text style={global.textInfo}>{item.endereco_familiar}</Text>
                                        </View> 
                                        <FontAwesome name="circle" size={20} color="#166B8A" style={{alignSelf: "center", marginTop: 5}} />
                                    </View>
                                )
                            })
                            :
                            <View style={{width: 393, height: 50, flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20}}>
                                <Text style={{color: "gray", fontSize: 18}}>Nenhum familiar cadastrado</Text>
                                <Entypo name="emoji-sad" size={20} color="gray" />
                            </View>
                        }
                        </ScrollView>
                    </View>
                    {
                        (familiar === true)
                        ?
                            <View style={{width: "100%", height: 600}}>
                                <Text style={css.title}>Novo Familiar</Text>
                                <TextInput value={nomeFamiliar} onChangeText={setNomeFamiliar} placeholder="Nome..." place style={global.info}></TextInput>
                                <TextInput value={rgFamiliar} onChangeText={setRgFamiliar} placeholder="RG..." style={global.info}></TextInput>
                                <TextInput value={parentescoFamiliar} onChangeText={setParentescoFamiliar} placeholder="Parentesco..." style={global.info}></TextInput>
                                <TextInput value={telefoneFamiliar} onChangeText={setTelefoneFamiliar} placeholder="Telefone..." style={global.info}></TextInput>
                                <TextInput value={emailFamiliar} onChangeText={setEmailFamiliar} placeholder="E-mail..." style={global.info}></TextInput>
                                <TextInput value={enderecoFamiliar} onChangeText={setEnderecoFamiliar} placeholder="Endereço..." style={global.info}></TextInput>
                                <View style={{alignItems: 'center', justifyContent: 'space-evenly', flexDirection: "row"}}>
                                    <TouchableOpacity onPress={() => {limpar(), setFamiliar(false)}} style={{alignItems: 'center', justifyContent: 'center', width: "35%", height: 45,  marginTop: 20}}>
                                        <Text style={{fontSize:18, color: "#166B8A", fontWeight: "bold"}}>Cancelar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={css.button} onPress={() => {cadastrarFamiliar()}}>
                                        <Text style={global.buttonText1}>Salvar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        :
                            <TouchableOpacity style={{ backgroundColor: "rgb(22,107,138)", width: "35%", height: 45, alignItems: "center", justifyContent: "center", borderRadius: 5, alignSelf: "center", marginBottom: "40%", marginTop: "10%"}} onPress={() => { setFamiliar(true)}}>
                                <Text style={global.buttonText1}>Novo Familiar</Text>
                            </TouchableOpacity>
                    }
                </ScrollView>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    images: {
        width: "100%",
        height: "13%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize:18,
        alignSelf: 'center',
        marginTop: 15,
        color: "#166B8A"
    },
    textArea: {
        width: "90%",
        alignSelf: 'center',
        padding: 10,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 15
    },
    button:{
        backgroundColor: "rgb(22,107,138)",
        width: "35%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 20,
    }
})