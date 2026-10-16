export type Rating = 'again'|'hard'|'good'|'easy';
export type ReviewState = { repetitions:number; interval:number; ease:number; dueAt:number; lastReviewed:number; status:'new'|'learning'|'mastered'; reviews:number; correct:number };
export const freshCard = ():ReviewState => ({repetitions:0,interval:0,ease:2.5,dueAt:0,lastReviewed:0,status:'new',reviews:0,correct:0});
export function reviewCard(state:ReviewState,rating:Rating,now=Date.now()):ReviewState {
 let {repetitions,interval,ease}=state;
 if(rating==='again'){repetitions=0;interval=10/1440;ease=Math.max(1.3,ease-.2)}
 else if(rating==='hard'){interval=Math.max(1,interval===0?1:interval*1.2);ease=Math.max(1.3,ease-.15);repetitions+=1}
 else if(rating==='good'){interval=repetitions===0?1:repetitions===1?3:Math.max(1,interval*ease);repetitions+=1}
 else {interval=repetitions===0?4:Math.max(4,interval*ease*1.3);ease=Math.min(3,ease+.15);repetitions+=1}
 const dueAt=now+interval*86400000;
 return {...state,repetitions,interval,ease,dueAt,lastReviewed:now,reviews:state.reviews+1,correct:state.correct+(rating==='again'?0:1),status:rating==='again'?'learning':repetitions>=3?'mastered':'learning'};
}
export const isDue=(s:ReviewState,now=Date.now())=>s.status!=='new'&&s.dueAt<=now;
export function dailyQueue<T extends {frequencyRank:number;char:string}>(items:T[],states:Record<string,ReviewState>,limit:number,now=Date.now()):T[]{const due=items.filter(x=>isDue(states[x.char]??freshCard(),now)).sort((a,b)=>(states[a.char]?.dueAt??0)-(states[b.char]?.dueAt??0));const fresh=items.filter(x=>(states[x.char]??freshCard()).status==='new').sort((a,b)=>a.frequencyRank-b.frequencyRank).slice(0,Math.max(0,limit));return [...due,...fresh]}
