import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';
import { toast } from 'react-toastify';

function Navbar() {
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );
    const dispatch = useDispatch();
    let navigate = useNavigate();

    function goLogout() {
        dispatch(addToken(''))
        toast.info("Usuário deslogado", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            } )
        navigate('/login')
    }
    var navbarComponent;
    if (token != "") {
        navbarComponent=
        <AppBar position="static">
                <Toolbar variant="dense" style={{ backgroundColor: "#e651a0" }}>
                    <Box className='cursor'>
                        <Typography className='texto-navbar' variant="h5" color="textSecondary">
                            BlogPessoal
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="start">
                        <Link to="/home" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography className='texto-navbar' variant="h6" color="textSecondary">
                                    home
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/posts" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography className='texto-navbar' variant="h6" color="textSecondary">
                                    postagens
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/temas" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography className='texto-navbar' variant="h6" color="textSecondary">
                                    temas
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/formularioTema" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography className='texto-navbar' variant="h6" color="textSecondary">
                                    cadastrar tema
                                </Typography>
                            </Box>
                        </Link>

                        <Box mx={1} className='cursor' onClick={goLogout}>
                            <Typography className='texto-navbar' variant="h6" color="textSecondary">
                                logout
                            </Typography>
                        </Box>

                    </Box>

                </Toolbar>
            </AppBar>
    }
    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar;