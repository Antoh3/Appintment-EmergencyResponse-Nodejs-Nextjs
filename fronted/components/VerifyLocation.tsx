import { message } from "antd"

const VerifyLocation = async(): Promise<[number,number]> => {
  return new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                resolve([position.coords.latitude,position.coords.longitude])
            },
            (error) =>{
              reject(message.error("Unable to access location please enable location"));
            }
        )
  })
}

export default VerifyLocation
