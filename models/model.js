import { MongoClient} from "mongodb";
const client=new MongoClient(process.env.MONGODB_URL);
await client.connect();
export const db=client.db("urldata");
export const userclient=db.collection("data");
export const loadlinks=async()=>{
    return await userclient.find().toArray();
};