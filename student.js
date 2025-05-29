    $("#datepickerA").datepicker({ changeMonth: true, changeYear: true });
    $("#datepickerB").datepicker({ changeMonth: true, changeYear: true });
    $("#datepickerC").datepicker({ changeMonth: true, changeYear: true });
    $("#datepickerD").datepicker({ changeMonth: true, changeYear: true });

function saveText(){
    const text = document.getElementById('textbox').value;
    console.log(text);
    // Here you can add code to send the text to your server or save it in a database
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://sanderd2026:<Rrgw01yEg7e7FyZr>@studentdreamfund.hqh4vrh.mongodb.net/?retryWrites=true&w=majority&appName=StudentDreamFund";

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    async function run() {
        try {
            // Connect the client to the server (optional starting in v4.7)
            await client.connect();
            console.log("Connected to MongoDB");
            // Send a ping to confirm a successful connection
            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);
}