import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Btn } from '../components/ui';
import { BookOpen, Plus } from 'lucide-react';

const entries = [
  { date: 'Day 3 · May 24', title: 'Sunrise above the clouds', preview: 'Woke up at 2am for the volcano trek. Worth every second...', mood: '🤩', trip: 'Bali' },
  { date: 'Day 2 · May 23', title: 'Lost in Ubud', preview: 'The rice terraces were even more stunning than photos...', mood: '😊', trip: 'Bali' },
  { date: 'Day 1 · May 22', title: "We're here!", preview: 'First day jitters and the most magical sunset at Tanah Lot...', mood: '🥰', trip: 'Bali' },
  { date: 'Day 4 · Nov 9', title: 'Fushimi Inari at dawn', preview: 'Left the hotel at 5am. Completely alone at the gates...', mood: '✨', trip: 'Kyoto' },
];

const moods = ['🤩', '😊', '😐', '😴', '😩', '🥰'];

export default function Journal() {
  const [active, setActive] = useState(0);
  const [selectedMood, setSelectedMood] = useState(0);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Trip Journal"
        subtitle="Document your travel memories"
        actions={
          <>
            <Btn variant="secondary" size="sm"><BookOpen size={13} /> View All</Btn>
            <Btn size="sm"><Plus size={13} /> New Entry</Btn>
          </>
        }
      />
      <div className="p-9">
        <div className="grid gap-5" style={{ gridTemplateColumns: '240px 1fr' }}>
          {/* Entry list */}
          <div>
            {['🌴 Bali Trip', '🏯 Kyoto (Nov 2025)'].map((group, gi) => {
              const groupEntries = entries.filter(e => e.trip === (gi === 0 ? 'Bali' : 'Kyoto'));
              return (
                <div key={group} className="mb-5">
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>{group}</div>
                  {groupEntries.map((entry, i) => {
                    const idx = entries.indexOf(entry);
                    return (
                      <button
                        key={entry.title}
                        onClick={() => setActive(idx)}
                        className="w-full text-left rounded-xl border p-3.5 mb-2 border-l-4 transition-all"
                        style={{
                          background: active === idx ? 'var(--terracotta-pale)' : 'var(--surface)',
                          borderColor: active === idx ? 'var(--terracotta)' : 'var(--border)',
                          borderLeftColor: active === idx ? 'var(--terracotta)' : 'transparent',
                        }}
                      >
                        <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--text-muted)' }}>{entry.date}</div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{entry.title}</div>
                          <span>{entry.mood}</span>
                        </div>
                        <div className="text-xs mt-1 truncate" style={{ color: 'var(--text-muted)' }}>{entry.preview}</div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Editor */}
          <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            {/* Toolbar */}
            <div className="px-5 py-2.5 border-b flex items-center gap-1" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
              {['B','I','U','H₁','H₂','≡','•','1.','🔗','📸'].map((t, i) => (
                <button key={i} className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold transition-colors" style={{ color: 'var(--text-muted)', background: 'transparent' }}>{t}</button>
              ))}
              <div className="flex-1" />
              <Btn size="sm">Save</Btn>
            </div>

            <div className="p-7 pb-4">
              <div className="text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: 'var(--terracotta)' }}>✈ Bali, Indonesia · Day 3</div>
              <input
                className="w-full font-display text-2xl border-none outline-none mb-2 bg-transparent"
                style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}
                defaultValue="Sunrise above the clouds"
              />
              <div className="flex items-center gap-4 mb-4">
                {['📅 May 24, 2026','📍 Mount Batur, Kintamani','🌡 12°C at summit'].map(m => (
                  <span key={m} className="text-xs flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>{m}</span>
                ))}
              </div>
              <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>How are you feeling today?</div>
              <div className="flex gap-2 mb-5">
                {moods.map((m, i) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMood(i)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all"
                    style={{
                      background: selectedMood === i ? 'var(--terracotta-pale)' : 'var(--surface-2)',
                      border: `2px solid ${selectedMood === i ? 'var(--terracotta)' : 'transparent'}`,
                      transform: selectedMood === i ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="px-7 pb-7 text-sm leading-loose outline-none min-h-64"
              contentEditable
              suppressContentEditableWarning
              style={{ color: 'var(--text-secondary)', lineHeight: 1.85 }}
            >
              <p>Set three alarms for 2am because I was terrified of sleeping through the volcano trek. All three went off — which meant I'd been awake since 1:30am already, too excited to sleep.</p>
              <br />
              <p>The guide picked us up at 2:30am in a rumbling minivan. By 4am we were at the base of Mount Batur, strapping on headlamps in complete darkness. The stars were extraordinary — the Milky Way was an actual visible band of light above us.</p>
              <br />
              <p>And then — the summit. And then — sunrise. Orange. Pink. The clouds were <em>below</em> us, a sea of white cotton, and the sun was rising through them. We ate breakfast cooked by volcanic steam and sat there for an hour, completely silent.</p>
            </div>

            <div className="grid grid-cols-4 gap-2 px-7 pb-7">
              {['🌋','🌅','⛅'].map(em => (
                <div key={em} className="aspect-square rounded-lg flex items-center justify-center text-2xl border" style={{ background: 'linear-gradient(135deg,#1a1a2e,#e94560)', borderColor: 'var(--border)' }}>{em}</div>
              ))}
              <button className="aspect-square rounded-lg flex items-center justify-center text-2xl border border-dashed transition-all" style={{ background: 'var(--surface-2)', borderColor: 'var(--border-strong)', color: 'var(--text-muted)' }}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
