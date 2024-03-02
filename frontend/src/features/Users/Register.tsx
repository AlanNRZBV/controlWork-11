import React, { useState } from "react";
import { RegisterMutation } from "../../types";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectRegisterError } from "./usersSlice";
import { register } from "./usersThunks";


const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    username: "",
    password: "",
    displayName: "",
    phoneNumber: "",
  });

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const validatePhoneNumber = (value: string) => {
      const re = /^0\s\d{3}\s\d{3}\s\d{3}$/;
      return re.test(value);
    };

    if (!validatePhoneNumber(state.phoneNumber)) {
      throw new Error("Wrong phone number");
    }

    try {
      await dispatch(register(state)).unwrap();
      navigate("/");
    } catch (e) {
      console.log("Caught on - REGISTRATION SUBMIT - ", e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="username"
                value={state.username}
                onChange={inputChangeHandler}
                autoComplete="new-username"
                error={Boolean(getFieldError("username"))}
                helperText={getFieldError("username")}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                value={state.password}
                onChange={inputChangeHandler}
                autoComplete="new-password"
                error={Boolean(getFieldError("password"))}
                helperText={getFieldError("password")}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="displayName"
                label="Display Name"
                type="text"
                value={state.displayName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError("displayName"))}
                helperText={getFieldError("displayName")}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                value={state.phoneNumber}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError("phoneNumber"))}
                helperText={"Phone must be in format: 0 XXX YYY ZZZ"}
                required
                fullWidth
                placeholder="0555123421"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
