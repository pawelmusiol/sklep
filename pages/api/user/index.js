import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/user'
import { decodeUserToken } from "./login"

export default async function handler(req, res) {
  const { method, headers, } = req

  console.log(headers)
  await dbConnect()

  switch (method) {
    case 'GET':

      break;
  }
}
