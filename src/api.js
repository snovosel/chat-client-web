import axios from 'axios';
import { call } from "redux-saga/effects";

const GET = axios.get;
const POST = axios.post;
const DELETE = axios.delete;
const PUT = axios.put;

export const GetRequest = () => call(GET, 'http://127.0.0.1:5000/get');
export const PostRequest = () => call(POST, 'http://127.0.0.1:5000/post');
export const DeleteRequest = () => call(DELETE, 'http://127.0.0.1:5000/delete');
export const PutRequest = () => call(PUT, 'http://127.0.0.1:5000/put');
