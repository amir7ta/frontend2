import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../utils/api/userApi";

export const getUsers = createAsyncThunk("user/getUserList", async () => {
  const users = await userApi.getUsers();
  return users;

});

export const getUser = createAsyncThunk("user/get", async (userId) => {
    const user = await userApi.getUser(userId);
    return user;
  
  });
  
export const login = createAsyncThunk("user/login", async (loginData) => {
    return await userApi.login(loginData);
  });