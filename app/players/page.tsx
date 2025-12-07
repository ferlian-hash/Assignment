"use client";
import { useState, useEffect } from "react";

export default function PlayersPage() {
  const [players, setPlayers] = useState<{id:number,name:string,score:number,finishedAt:string}[]>([]);
  const [name, setName] = useState("");

  /* ===== FETCH DATA DB ===== */
  async function loadPlayers() {
    const res = await fetch("/api/players", { cache:"no-store" });
    const data = await res.json();
    setPlayers(data);
  }

  /* ===== ADD PLAYER MANUAL (OPSIONAL) ===== */
  async function addPlayer() {
    if(!name) return alert("Nama tidak boleh kosong!");

    await fetch("/api/players", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ name, score:0 })     // default score
    });

    setName("");
    loadPlayers();
  }

  /* ===== DELETE ALL DATA (OPSIONAL) ===== */
  async function resetDB() {
    if(!confirm("Hapus semua data Leaderboard?")) return;
    await fetch("/api/players", { method:"DELETE" });
    loadPlayers();
  }

  useEffect(()=>{ loadPlayers(); },[]);

  return (
    <div style={container}>
      <h1 style={{fontSize:36, fontWeight:"bold", marginBottom:10}}>🏆 Global Leaderboard</h1>
      <p style={{opacity:0.8}}>Data dari Prisma Database</p>

      {/* ===== INPUT NAME ===== */}
      <div style={{marginTop:25}}>
        <input
          value={name}
          onChange={e=>setName(e.target.value)}
          placeholder="Add player (optional)"
          style={input}
        />
        <button onClick={addPlayer} style={btnRed}>+ Add</button>
        <button onClick={loadPlayers} style={btnGray}>Refresh</button>
        <button onClick={resetDB} style={btnBlack}>Reset DB</button> {/* optional */}
      </div>

      {/* ===== LIST ===== */}
      <div style={{marginTop:40, width:"100%", maxWidth:600}}>
        {players.length < 1 && <p style={{marginTop:20}}>Belum ada data 📭</p>}

        {players.map((p,i)=>(
          <div key={p.id} style={card}>
            <div style={{fontSize:22, fontWeight:"bold"}}>{i+1}. {p.name}</div>
            <div style={{fontSize:18, marginTop:6}}>⏳ Score: <b>{p.score}</b></div>
            <div style={{fontSize:14, opacity:0.8}}>
              📅 {new Date(p.finishedAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== STYLE ===== */
const container:any = {
  textAlign:"center",
  color:"white",
  padding:"50px 20px",
  minHeight:"100vh",
  background:"linear-gradient(180deg,#111,#222)"
};

const input:any = {
  padding:10,
  borderRadius:6,
  width:220,
  marginRight:10,
  color:"black"
};

const btnBase:any = {
  padding:"9px 15px",
  margin:"0 4px",
  borderRadius:6,
  cursor:"pointer",
  border:"none",
  fontWeight:"bold"
};

const btnRed:any = {...btnBase, background:"#d62828", color:"white"};
const btnGray:any = {...btnBase, background:"#444"};
const btnBlack:any = {...btnBase, background:"black", color:"white"};

const card:any = {
  background:"rgba(255,255,255,0.08)",
  padding:"15px 20px",
  borderRadius:10,
  margin:"10px auto",
  textAlign:"left"
};
