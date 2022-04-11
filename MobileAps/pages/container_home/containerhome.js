import { createDrawerNavigator , DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import { useState, useEffect } from 'react';
import {View, Text, Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from '../Global/Style'

import CadastrarAssistido from '../Assistidos/CadastrarAssistido/Index';
import ListarAssistidos from '../Assistidos/ListarAssistidos/Index';
import VerAssistido from '../Assistidos/VerAssistido/Index';
import CadastrarFuncionario from '../Funcionarios/CadastrarFuncionario/Index';
import ListarFuncionario from '../Funcionarios/ListarFuncionarios/Index';
import MeuPerfil from '../Funcionarios/MeuPerfil/Index';
import VerFuncionario from '../Funcionarios/VerFuncionario/Index';
import Home from '../Geral/Home/Index';

const Drawer = createDrawerNavigator();

export default function ContainerHome() {

    const[foto, setFoto] = useState(null);
    const[nome, setNome] = useState(null);

    useEffect(async() => {
        let value = await AsyncStorage.getItem('userdata');
        if(value !== null) {
            value = JSON.parse(value);

            fetch(`http://192.168.0.29:3000/funcionarios/${value}`)
            // fetch(`http://192.168.137.1:3000/funcionarios/${value.matricula}`)
            // fetch(`http://10.87.207.27:3000/funcionarios/${value.matricula}`)
            .then(resp => {return resp.json()})
            .then(data => {
                setFoto(data[0].foto);
                setNome(data[0].nome_completo);
            })
            .catch( err => { console.log(err) })
        }
    }, [])

    return (
        <Drawer.Navigator useLegacyImplementation={true} screenOptions={{ headerShown: false,  
            drawerStyle: {
                backgroundColor: '#166B8A',
                width: 200,
                height: 450, 
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
            },
            drawerHideStatusBarOnOpen: true }} drawerContent={props => {
            return (
              <DrawerContentScrollView {...props}>
                <View style={{alignItems: "center", width: "100%", height: 180}}>
                    <Image source={(foto !== null) ? {uri: foto} : require("../assets/user.png")} style={global.imageUser}/>
                    <Text style={{ width: "70%", color: 'white', fontWeight: 'bold', fontSize: 16, marginTop: 10}}>Olá, {nome}</Text>
                </View>
                <DrawerItemList {...props} />
                <DrawerItem labelStyle={{color: 'white', fontWeight: 'bold', fontSize: 16}} style={{borderBottomWidth: 1, borderBottomColor: "white"}} label="Sair" onPress={async () => {     
                        await AsyncStorage.removeItem('userdata');
                        props.navigation.navigate("Login");
                    }} />
              </DrawerContentScrollView>
            )
          }}
            options={{
                drawerContentContainerStyle: { width: 0 }
            }}
          >
            <Drawer.Screen name="Home" component={Home} options={{
                drawerLabel: () => {return (null)},
                drawerItemStyle: {display: "none" }
            }} />
            <Drawer.Screen name="Meu Perfil" component={MeuPerfil} options={{
                    drawerLabel: "Meu Perfil",
                    drawerLabelStyle: {color:'white', fontWeight: 'bold', fontSize: 16},
                    drawerItemStyle: {borderBottomWidth: 1, borderBottomColor: "white", marginBottom: 40}
                }}/>
            <Drawer.Screen name="CadastrarAssistido" component={CadastrarAssistido} options={{
                drawerLabel: () => {return (null)},
                drawerItemStyle: {display: "none" }
            }} />
            <Drawer.Screen name="ListarAssistidos" component={ListarAssistidos} options={{
                drawerLabel: () => {return (null)},
                drawerItemStyle: {display: "none" }
            }} />
            <Drawer.Screen name="VerAssistido" component={VerAssistido} options={{
                drawerLabel: () => {return (null)},
                drawerItemStyle: {display: "none" }
            }} />
            <Drawer.Screen name="CadastrarFuncionario" component={CadastrarFuncionario} options={{
                drawerLabel: () => {return (null)},
                drawerItemStyle: {display: "none" }
            }} />
            <Drawer.Screen name="ListarFuncionario" component={ListarFuncionario} options={{
                drawerLabel: () => {return (null)},
                drawerItemStyle: {display: "none" }
            }} />
            <Drawer.Screen name="VerFuncionario" component={VerFuncionario} options={{
                drawerLabel: () => {return (null)},
                drawerItemStyle: {display: "none" }
            }} />
        </Drawer.Navigator>
  );
}