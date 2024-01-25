"use client";
import { useAuthContext } from "@/context/AuthContext";
import { signOutUser } from "@/firebase/signOut";
import { Box, Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { centralize } from "../login/page";

export default function Home() {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (user === null) handleSignOut();
    }, [user]);

    const handleSignOut = async () => {
        router.push("/");
        await signOutUser();
    };

    if (user === null) {
        return <Box sx={{ background: "#000000" }}></Box>;
    } else {
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
                        <Typography variant="h1">Home</Typography>
                    </Grid2>
                    <Grid2
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        sx={centralize()}
                    >
                        <h2>{user && user.email}</h2>
                    </Grid2>
                    <Grid2
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        sx={centralize()}
                    >
                        <Button variant="contained" onClick={handleSignOut}>
                            Sair
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
        );
    }
}
