"use client";
import React, { useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    TextField,
    CircularProgress,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { signIn } from "@/firebase";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
export const centralize = (gap?: string) => {
    return {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: gap ? gap : 0,
    };
};

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        const { result, error } = await signIn(email, password);
        if (error) {
            const e = error as any;
            switch (e.code) {
                case "auth/wrong-password":
                    enqueueSnackbar("Senha incorreta", {
                        variant: "error",
                    });
                    break;
                case "auth/invalid-email":
                    enqueueSnackbar("Email inválido", {
                        variant: "error",
                    });
                    break;
                case "auth/user-disabled":
                    enqueueSnackbar("Usuário desabilitado", {
                        variant: "error",
                    });
                    break;
                case "auth/user-not-found":
                case "auth/invalid-credential":
                    enqueueSnackbar("Usuário não encontrado", {
                        variant: "error",
                    });
                    break;

                default:
                    enqueueSnackbar(`Erro ao efetuar login ${e}`, {
                        variant: "error",
                    });
                    break;
            }
            setLoading(false);
            return;
        } else {
            enqueueSnackbar("Login efetuado com sucesso!", {
                variant: "success",
            });
            return router.push("/home");
        }
    };

    return (
        <Box>
            <Grid2 container spacing={2}>
                <Grid2
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={centralize()}
                >
                    <Typography variant="h1">Entre com sua conta</Typography>
                </Grid2>
                <Grid2
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={centralize("10%")}
                >
                    <TextField
                        sx={{ minWidth: "40%" }}
                        label={"Email"}
                        variant={"outlined"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        sx={{ minWidth: "40%" }}
                        label={"Password"}
                        variant={"outlined"}
                        type={"password"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid2>
                <Grid2
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={loading ? centralize() : undefined}
                >
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <ButtonGroup sx={centralize("2%")}>
                            <Button
                                variant="contained"
                                onClick={() => handleLogin(email, password)}
                            >
                                Entrar
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setEmail("");
                                    setPassword("");
                                }}
                            >
                                Cancelar
                            </Button>
                        </ButtonGroup>
                    )}
                </Grid2>
            </Grid2>
        </Box>
    );
}
