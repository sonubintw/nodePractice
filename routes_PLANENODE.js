const fs = require('fs')

const requestHandler = (req, res) => {
    // process.exit()
    const url = req.url
    const method = req.method
    // console.log("hihiihii");
    // console.log(method)

    if (url === "/") {
        res.write('<html>')
        res.write('<head><title>testing</title></head>')
        res.write('<body><h1>default route</h1></body>')
        res.write('<body><form action="/message" method="POST"> <input type="text" name="messsage"><button type="submit">send</button></input></form></body>')
        res.write('</html>')
        return res.end()
    }



    if (url === '/message' && method === 'POST') {
        // console.log("mememememememm");
        let body = [];

        req.on('data', (chunk) => {
            // console.log(chunk);

            body.push(chunk);
        });



        req.on('end', () => {

            const parseBody = Buffer.concat(body).toString()
            console.log(parseBody);
            const clientData = parseBody.split("=")[1].split("+").join(" ")

            console.log(clientData.length);

            if (!clientData || clientData.length <= 0) {
                res.writeHead(401, "empty data")
                // res.statusCode = 401;  
                // res.statusMessage = "empty data";
                return res.end('No data received.');

            }

            // fs.writeFileSync('message.txt', clientData);
            fs.writeFile('message.txt', clientData, (err) => {
                if (err) {
                    res.writeHead(401, 'user issue or some shit')
                    return res.end()

                }

                res.writeHead(302, { location: '/' })
                return res.end('Data written successfully');
            })



        })

        //this is for redirection
        return;


    }

    res.setHeader('Content-type', 'text/html')
    res.write('<html>')
    res.write('<head><title> my nigga my nigga</title></head>')
    res.write('<body><h1>im fucking best heheheh</h1></body>')
    res.write('</html>')
    res.end()
}

module.exports = { requestHandler }

