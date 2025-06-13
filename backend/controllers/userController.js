const Stats = require("../models/statsModel")
const User = require("../models/userModel")


async function getUserStats(req, res) {
    try {
        console.log("reached")
        const username = req.params.username;

        console.log(username)

        const user = await User.find({ username }).populate('stats');
        console.log(user);

        return res.status(200).json({
            user: user,
            success: "data fetched successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "error while fetching the user profile"
        })
    }
}
function getYesterdayDateFromFormatted(formattedDate) {
    const [month, day, year] = formattedDate.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day); // month is 0-indexed

    // Subtract 1 day
    dateObj.setDate(dateObj.getDate() - 1);

    // Format as m/d/yyyy (no leading zeros)
    const yesterdayFormatted =
        (dateObj.getMonth() + 1) + '/' + // month (1-based)
        dateObj.getDate() + '/' +        // day
        dateObj.getFullYear();           // year

    return yesterdayFormatted;
}


async function submitTest(req, res) {
    try {
        const { actualWpm, accuracy, totalKeyStrokes, formattedDate, duration } = req.body;

        const user = await User.findById(req.user._id).populate("stats");

        const stats = user.stats;

        if (stats.bestWpm < Number(actualWpm)) stats.bestWpm = actualWpm;
        if (stats.bestAccuracy < Number(accuracy)) stats.bestAccuracy = accuracy;

        stats.totalKeyStrokes += totalKeyStrokes;

        const [month, day, year] = formattedDate.split('/').map(Number);
        const dateObj = new Date(year, month - 1, day);

        stats.testHistory.push({
            wpm: actualWpm,
            accuracy: accuracy,
            duration: duration,
            wordsTyped: totalKeyStrokes,
            testDate: formattedDate  
        });

        stats.markModified("testHistory");

        // // Initialize streakList map if undefined
        // if (!stats.streakList) {
        //   stats.streakList = new Map();
        // }

        const currentCount = stats.streakList.get(formattedDate) || 0;

        const yesterdayDate = getYesterdayDateFromFormatted(formattedDate);

        console.log(yesterdayDate)
        const yesterdayStreak = stats.streakList.get(yesterdayDate);



        if (!yesterdayStreak) stats.currentStreak = 0;

        else {
            if (!stats.streakList.get(formattedDate)) {
                stats.currentStreak++;
            }
        }
        stats.streakList.set(formattedDate, currentCount + 1);

        if (stats.currentStreak > stats.bestStreak) {
            stats.bestStreak = stats.currentStreak;
        }

        await stats.save();




        return res.status(200).json({
            success: "Test submitted successfully",
            user: user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error while submitting test",
        });
    }
}




// async function getUserStreak(req,res){
//     const user=
// }



module.exports = {
    getUserStats,
    submitTest,
    // getUserStreak,
}