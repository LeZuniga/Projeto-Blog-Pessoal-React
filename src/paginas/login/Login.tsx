import React, { useState, ChangeEvent, useEffect } from "react";
import { Grid, Box, Typography, Button } from "@material-ui/core";
import './Login.css';
import { TextField } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom'
import UserLogin from "../../models/UserLogin";
import { login } from "../../services/Service";
import { useDispatch } from "react-redux";
import { addToken } from "../../store/tokens/actions";

function Login() {

    let navigate = useNavigate()
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: ''
        }
    )

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (token != '') {
            dispatch(addToken(token))
            navigate('/home')
        }
    }, [token])

    // Envia os dados da requisição os dados de Login.
    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {

        // impede o comportamento padrão do botão
        e.preventDefault();

        try {
            await login(`/usuarios/logar`, userLogin, setToken)

            alert('Usuario logado com sucesso');
        } catch (error) {
            alert('Dados do usuário incosistentes. Erro ao logar');
        }
    }


    return (
        <Grid container direction='row' justifyContent="center" alignItems="center">
            <Grid alignItems="center" xs={6}>
                <Box paddingX={20}>
                    <form onSubmit={onSubmit}>
                        <Typography variant="h3" gutterBottom color="textPrimary" component='h3' align='center' style={{ fontWeight: 'bold' }}>Entrar</Typography>
                        <TextField id='usuario' value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} label='usuario' variant='outlined' name='usuario' margin='normal' fullWidth />
                        <TextField id='senha' value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                        <Box marginTop={2} textAlign='center'>

                            <Button type='submit' variant='contained' color='primary'>
                                Logar
                            </Button>
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant="subtitle1" gutterBottom align="center">Não tem uma conta ?</Typography>
                        </Box>
                        <Link to='/cadastro'>
                        <Typography variant="subtitle1" gutterBottom align="center" style={{ fontWeight: "bold" }} >Cadastre-se</Typography>
                            </Link>    
                    </Box>
                </Box>
            </Grid>
            <Grid xs={6} style={{
                backgroundImage: `url(https://imgur.com/OVUjolr.jpg)`,
                backgroundRepeat: 'no-repeat', width: "100vh", minHeight: "100vh", backgroundSize: "cover", backgroundPosition: "center"
            }}>
            </Grid>
        </Grid>
    );

}


export default Login;