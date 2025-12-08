"use client";
import { useState, useEffect, CSSProperties } from "react";

export default function EscapeRoom({ playerName }: { playerName: string }) {
  const [time, setTime] = useState<number>(300);
  const [stage, setStage] = useState(1);
  const [timerRunning, setTimerRunning] = useState(true);
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");

  const [leaderboard, setLeaderboard] = useState<{name:string,score:number}[]>([]);
  const [saved, setSaved] = useState(false);

  /* Load Local Storage */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    setLeaderboard(data);
  }, []);

  /* Timer */
  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => setTime(t => t - 1), 1000);

    if(time <= 0){
      clearInterval(interval);
      alert("⏳ Time's up! You failed 😭");
      resetGame();
    }
    return ()=>clearInterval(interval);
  }, [time, timerRunning]);

  /* Save to Database */
  async function saveToDatabase(){
    try{
      const res = await fetch("/api/players",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ name: playerName, score: time })
      });

      if(res.ok) alert("✔ Score saved to DB!");
      else alert("❌ Failed to save. Check console");
    }catch(e){
      console.log(e);
      alert("⚠ Error saving DB");
    }
  }

  /* Save Score */
  async function saveScore(){
    setTimerRunning(false);
    setSaved(true);

    // Local
    let updated = leaderboard.filter(x=>x.name!==playerName);
    updated.push({name:playerName, score:time});
    updated.sort((a,b)=>b.score-a.score);
    updated = updated.slice(0,10);

    localStorage.setItem("leaderboard", JSON.stringify(updated));
    setLeaderboard(updated);

    // Save DB
    await saveToDatabase();
  }

  function newGame(){
    setStage(1); setTime(300); setAns1(""); setAns2(""); setAns3(""); setSaved(false); setTimerRunning(true);
  }

  function resetGame(){
    setStage(1); setTime(300); setAns1(""); setAns2(""); setAns3(""); setSaved(false); setTimerRunning(false);
  }

  return (
    <main style={mainStyle}>
      <h2 style={{ fontSize:28,fontWeight:"bold" }}>🔐 Escape Room - {playerName}</h2>
      <p style={{ fontSize:20 }}>⏳ {time}s left</p>

      {/* ================= Stage 1 ================= */}
      {stage===1 && (
        <div style={box}>
          <h3>Fix syntax function</h3>
          <pre style={view}>functionhello(){"{"}console.log("Hi"){"}"}</pre>
          <textarea style={input}
            value={ans1} onChange={e=>setAns1(e.target.value)}
            placeholder='function hello(){ console.log("Hi") }'
          />
          <button style={btn} onClick={()=>
            ans1.includes("function hello") ? setStage(2) : alert("Masih salah!")
          }>Submit</button>
        </div>
      )}

      {/* ================= Stage 2 ================= */}
      {stage===2 && (
        <div style={box}>
          <h3>Cari & klik 🐞</h3>
          <img src="/bug.png" width={120} style={{cursor:"pointer"}}
            onClick={()=>setStage(3)} />
        </div>
      )}

      {/* ================= Stage 3 ================= */}
      {stage===3 && (
        <div style={box}>
          <h3>Print 0-1000</h3>
          <textarea style={input}
            value={ans2} onChange={e=>setAns2(e.target.value)}
            placeholder='for(let i=0;i<=1000;i++){console.log(i)}'
          />
          <button style={btn} onClick={()=>
            ans2.includes("for")&&ans2.includes("1000") ? setStage(4) : alert("Belum benar!")}>
            Submit
          </button>
        </div>
      )}

      {/* ================= Stage 4 ================= */}
      {stage===4 && (
        <div style={box}>
          <h3>Convert JSON → CSV</h3>
          <textarea style={input}
            value={ans3} onChange={e=>setAns3(e.target.value)}
            placeholder='Use map(), join() ...'
          />
          <button style={btn} onClick={()=>
            ans3.includes("join") ? setStage(5) : alert("Kurang tepat!")}>
            Convert
          </button>
        </div>
      )}

      {/* ================= Finish ================= */}
      {stage===5 && (
        <div style={{textAlign:"center"}}>
          <h1 style={{color:"yellow",fontSize:36,marginTop:10}}>🎉 YOU ESCAPED!</h1>

          {!saved ? (
            <button style={{...btn, background:"green"}} onClick={saveScore}>
              Save My Score
            </button>
          ) : (
            <button style={{...btn, background:"blue"}} onClick={newGame}>
              🔄 New Game
            </button>
          )}

          <h3 style={{marginTop:25}}>🏆 Leaderboard (Local)</h3>
          {leaderboard.length<1 && <p>No record...</p>}
          {leaderboard.map((x,i)=>( <p key={i}>{i+1}. {x.name} — {x.score}s left</p> ))}

          <button style={{...btn, background:"gray"}}
            onClick={()=>{ localStorage.removeItem("leaderboard"); setLeaderboard([]); }}>
            Reset Leaderboard (Local)
          </button>

          {/* RESET DATABASE */}
          <button style={{...btn, background:"darkred"}}
            onClick={async()=>{ await fetch("/api/players",{method:"DELETE"}); alert("🔥 DB cleared!"); }}>
            Reset Leaderboard (DB)
          </button>

          <div style={{marginTop:20}}>
            <a href="/players"><button style={{...btn,background:"purple"}}>📊 View Database Leaderboard</button></a>
          </div>
        </div>
      )}
    </main>
  );
}

/************* STYLE *************/
const mainStyle: CSSProperties = {
  minHeight:"100vh",
  background:"url('/escape-room-bg.jpg') center/cover no-repeat",
  display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
  color:"white",padding:20,textAlign:"center"
};

const box: CSSProperties = {
  background:"rgba(0,0,0,0.75)",padding:20,width:420,borderRadius:10,marginTop:20
};
const view: CSSProperties = {
  background:"#000",color:"lime",padding:10,borderRadius:8,marginBottom:10
};
const input: CSSProperties = {
  width:"100%",height:110,padding:10,borderRadius:8,color:"black",marginTop:10
};
const btn: CSSProperties = {
  background:"red",padding:"10px 18px",border:"none",borderRadius:8,
  color:"white",cursor:"pointer",marginTop:12,fontWeight:"bold"
};
