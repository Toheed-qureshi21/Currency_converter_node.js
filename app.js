import https from "https";
import chalk  from "chalk";
import dotenv from "dotenv";
import readline from "readline"
dotenv.config();
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});
const converCurrency = (amount,rate) => {
  return (amount*rate).toFixed(3);
}

const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;
https.get(url,(response)=>{
    let data = ""
    response.on('data',(chunk)=>{
        data += chunk;   
    })
    response.on("end",()=>{
        const parsedData = JSON.parse(data).conversion_rates;
        rl.question(chalk.bgBlueBright("Enter the amount in USD\n"),(amount)=>{
            rl.question(chalk.bgGreenBright("Enter the Targeted Currency : \n"),(currency)=>{
                amount = parseFloat(amount);
                if (isNaN(amount) || amount <= 0) {
                    console.log(chalk.bgRed("Invalid amount. Please enter a valid number."));
                    rl.close();
                    return;
                }
        
                const rate = parsedData[currency.toUpperCase()];
                if (rate) {
                    console.log(chalk.bgBlack(`${amount} USD is approximately ${converCurrency(amount,rate)} ${currency.toUpperCase()}`));
                }
                else{
                    console.log("Invalid currency code "); 
                }
                rl.close();
            })
        })
        
    })
    response.on('error',(err)=>{
        console.log(err.message+ "This error caused");
        
    })
})

