// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/models'
import { MongoClient } from 'mongodb'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let {name,email,password,userId} = req.body

    const client = MongoClient.connect("mongodb+srv://Augustus:Filipovoheslo1@cluster0.pwpm4qt.mongodb.net/Blogs?retryWrites=true&w=majority")        
    const db = (await client).db()
    const users = db.collection("users")
    const user= await users.findOne({email:email}) 
    if(user)
    {
      res.json({message:"Email already Registered"})
    }
    else{
      await users.insertOne({ email:email,password:password,name:name,userId:userId}) 
      res.json({email:email,password:password,name:name,userId:userId})
    }
  }
