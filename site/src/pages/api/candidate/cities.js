import getDB from "../../../lib/mongoClient";


export default async function handler(req, res) {
    const name = "Cities API";
    if (req.method === "GET") {
        try {
            const { year, candId } = req.query;
            if (!year || !candId) {
                return res
                    .status(400)
                    .send(name, " | Prior selectons required");
            }
            const db = await getDB();
            const collection = await db.collection(`${year}_conts`);
            const query = { CAND_ID: candId };
            const group = {
                _id:
                    { CITY: "$CITY", STATE: "$STATE" },
                AMT:
                    { $sum: "$AMT" }
            };
            const projection = {
                _id: 0,
                CITY: "$_id.CITY",
                STATE: "$_id.STATE",
                AMT: 1
            };
            const pipeline = [
                { $match: query },
                { $group: group },
                { $project: projection },
                { $sort: { AMT: -1 } },
                { $limit: 5 }
            ];
            const data = await collection
                .aggregate(pipeline)
                .toArray();
            res.json(data);
        } catch (err) {
            console.error(name, " | Error: ", err);
            res
                .status(500)
                .send("Internal server error");
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res
            .status(405)
            .end(`Method ${req.method} Not Allowed`)
    }
};
