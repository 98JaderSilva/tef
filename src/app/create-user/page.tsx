"use client";
import { signUp } from "@/firebase";
import {
    Box,
    TextField,
    CircularProgress,
    ButtonGroup,
    Button,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";

export default function CreateUser() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = React.useState(false);

    const centralize = (gap?: string) => {
        return {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: gap ? gap : 0,
        };
    };

    const handleCreate = async (email: string, password: string) => {
        setLoading(true);
        const { result, error } = await signUp(email, password);
        if (error) {
            const e = error as any;
            debugger;
            switch (e.code) {
                case "auth/email-already-in-use":
                    enqueueSnackbar("Email já cadastrado", {
                        variant: "error",
                    });
                    break;
                case "auth/invalid-email":
                    enqueueSnackbar("Email inválido", {
                        variant: "error",
                    });
                    break;
                case "auth/operation-not-allowed":
                    enqueueSnackbar("Operação não permitida", {
                        variant: "error",
                    });
                    break;
                case "auth/missing-password":
                    enqueueSnackbar("Senha não informada", {
                        variant: "error",
                    });
                    break;
                case "auth/weak-password":
                    enqueueSnackbar(
                        "Senha fraca, senha deve conter no mínimo 6 caracteres",
                        {
                            variant: "error",
                        }
                    );
                    break;
                default:
                    enqueueSnackbar(`Erro ao criar conta ${e}`, {
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
            return router.push("/");
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
                    <Typography variant="h1">Crie sua conta</Typography>
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
                                onClick={() => handleCreate(email, password)}
                            >
                                Cadastrar
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
