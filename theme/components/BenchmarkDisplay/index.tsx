import data from '../../data/benchmarks.json';
import styles from './index.module.css';

// ── Helpers ───────────────────────────────────────────────────────────────────

function _fmtRows(n: number): string {
  if (n >= 1e15) return '1 quadrillion';
  if (n >= 1e9) return `${(n / 1e9).toFixed(0)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}k`;
  return String(n);
}

function fmtNs(ns: number | null): string {
  if (ns == null) return '—';
  return `${ns.toFixed(1)} ns`;
}

function fmtUs(us: number | null): string {
  if (us == null) return '—';
  if (us >= 1000) return `${(us / 1000).toFixed(2)} ms`;
  return `${us.toFixed(1)} µs`;
}

function fmtBytes(b: number | null): string {
  if (b == null) return '—';
  if (b === 0) return '0';
  if (b >= 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${b} B`;
}

// ── Bar component ─────────────────────────────────────────────────────────────

function Bar({
  label,
  value,
  max,
  display,
}: {
  label: string;
  value: number | null;
  max: number;
  display: string;
}) {
  const pct =
    value != null && max > 0
      ? Math.min((value / max) * 100, 100).toFixed(1)
      : '0';
  return (
    <div className={styles.barRow}>
      <span className={styles.barLabel}>{label}</span>
      <div className={styles.barTrack}>
        <div className={styles.barFill} style={{ width: `${pct}%` }} />
      </div>
      <span className={styles.barValue}>{display}</span>
    </div>
  );
}

// ── FrameScaleChart ───────────────────────────────────────────────────────────
//
// Proves that per-frame cost is O(visible cells), not O(total rows).
// All bars are nearly identical regardless of row count.

export function FrameScaleChart() {
  const configs = [
    { label: '20 cols × 10k rows', value: data.frame_us.cols20_10k },
    { label: '50 cols × 1M rows', value: data.frame_us.cols50_1M },
    { label: '100 cols × 10M rows', value: data.frame_us.cols100_10M },
    { label: '1 000 cols × 1B rows', value: data.frame_us.cols1000_1B },
    { label: '50 cols × 1 quadrillion', value: data.frame_us.cols50_1Q },
  ];
  const values = configs
    .map((c) => c.value)
    .filter((v): v is number => v != null);
  const max = values.length > 0 ? Math.max(...values) * 1.25 : 1;
  const budget = 16_600;
  const budgetLabel = `60fps budget: ${budget.toLocaleString()} µs`;

  return (
    <div className={styles.chart}>
      <div className={styles.chartHeader}>
        <span className={styles.chartLabel}>Time per frame (µs)</span>
        <span className={styles.chartBudget}>{budgetLabel}</span>
      </div>
      {configs.map((c) => (
        <Bar
          key={c.label}
          label={c.label}
          value={c.value}
          max={max}
          display={fmtUs(c.value)}
        />
      ))}
      <p className={styles.chartNote}>
        All configs render in 65–89 µs — less than 0.6% of the 16.6 ms frame
        budget at 60fps. Row count has zero impact on frame time.
      </p>
    </div>
  );
}

// ── HitTestTable ──────────────────────────────────────────────────────────────
//
// Proves that hit-test cost is O(log n_cols), not O(n_rows).

export function HitTestTable() {
  const rows = [
    { label: '1 000 rows, 1 000 cols', ns: data.hit_test_ns.extreme_1k_rows },
    {
      label: '1 billion rows, 1 000 cols',
      ns: data.hit_test_ns.extreme_1B_rows,
    },
    {
      label: '1 quadrillion rows, 1 000 cols',
      ns: data.hit_test_ns.extreme_1Q_rows,
    },
  ];
  const colRows = [
    { label: '10 cols', ns: data.hit_test_ns.cell_10cols },
    { label: '100 cols', ns: data.hit_test_ns.cell_100cols },
    { label: '1 000 cols', ns: data.hit_test_ns.cell_1000cols },
  ];
  return (
    <div className={styles.tables}>
      <div className={styles.tableBox}>
        <p className={styles.tableTitle}>
          Varying row count (1 000 cols fixed)
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Configuration</th>
              <th>Hit-test time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <td>{r.label}</td>
                <td className={styles.mono}>{fmtNs(r.ns)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.tableBox}>
        <p className={styles.tableTitle}>
          Varying column count (O(log n) in action)
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Columns</th>
              <th>Hit-test time</th>
            </tr>
          </thead>
          <tbody>
            {colRows.map((r) => (
              <tr key={r.label}>
                <td>{r.label}</td>
                <td className={styles.mono}>{fmtNs(r.ns)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── InitTable ─────────────────────────────────────────────────────────────────
//
// Proves that initialization is O(n_cols), not O(n_rows).

export function InitTable() {
  const byRows = [
    { label: '1 000', us: data.init_us.rows_1k },
    { label: '100 000', us: data.init_us.rows_100k },
    { label: '1 000 000', us: data.init_us.rows_1M },
    { label: '100 000 000', us: data.init_us.rows_100M },
    { label: '1 000 000 000', us: data.init_us.rows_1B },
    { label: '1 000 000 000 000 000', us: data.init_us.rows_1Q },
  ];
  const byCols = [
    { label: '5', us: data.init_us.cols_5 },
    { label: '20', us: data.init_us.cols_20 },
    { label: '50', us: data.init_us.cols_50 },
    { label: '100', us: data.init_us.cols_100 },
    { label: '1 000', us: data.init_us.cols_1000 },
  ];
  const colValues = byCols
    .map((r) => r.us)
    .filter((v): v is number => v != null);
  const maxCols = colValues.length > 0 ? Math.max(...colValues) * 1.25 : 1;

  return (
    <div className={styles.tables}>
      <div className={styles.tableBox}>
        <p className={styles.tableTitle}>
          Varying row count — FnDataSource (20 cols fixed)
        </p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rows</th>
              <th>Init time</th>
            </tr>
          </thead>
          <tbody>
            {byRows.map((r) => (
              <tr key={r.label}>
                <td className={styles.mono}>{r.label}</td>
                <td className={styles.mono}>{fmtUs(r.us)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.chartNote}>
          Flat regardless of row count — O(n_cols), not O(n_rows).
        </p>
      </div>
      <div className={styles.tableBox}>
        <p className={styles.tableTitle}>
          Varying column count (1M rows fixed)
        </p>
        {byCols.map((r) => (
          <Bar
            key={r.label}
            label={`${r.label} cols`}
            value={r.us}
            max={maxCols}
            display={fmtUs(r.us)}
          />
        ))}
      </div>
    </div>
  );
}

// ── MemoryTable ───────────────────────────────────────────────────────────────

export function MemoryTable() {
  const rows = [
    {
      source: 'FnDataSource',
      desc: 'Virtual / server-side — data generated on demand',
      bytes: data.memory_bytes_per_row.fn_datasource,
      highlight: true,
    },
    {
      source: 'VecDataSource (empty rows)',
      desc: 'In-memory, no cell values',
      bytes: data.memory_bytes_per_row.vec_empty,
      highlight: false,
    },
    {
      source: 'VecDataSource (10 cols, ~8 chars)',
      desc: 'In-memory, realistic cell data',
      bytes: data.memory_bytes_per_row.vec_10cols_8chars,
      highlight: false,
    },
  ];
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Data source</th>
          <th>Description</th>
          <th>Memory / row</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.source} className={r.highlight ? styles.rowHighlight : ''}>
            <td className={styles.mono}>{r.source}</td>
            <td>{r.desc}</td>
            <td className={styles.mono}>
              {r.bytes === 0 ? <strong>0 bytes</strong> : fmtBytes(r.bytes)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── SortTable ─────────────────────────────────────────────────────────────────

export function SortTable() {
  const rows = [
    {
      label: 'Numeric sort (cold)',
      desc: 'Radix sort, first call — key extraction + sort',
      ms: data.sort_ms.numeric_cold_100k,
    },
    {
      label: 'Numeric sort (cached)',
      desc: 'Radix sort, direction toggle — keys reused from cache',
      ms: data.sort_ms.numeric_cached_100k,
    },
    {
      label: 'String sort (cold)',
      desc: 'Lexicographic comparison sort',
      ms: data.sort_ms.string_cold_100k,
    },
  ];
  const sortValues = rows
    .map((r) => r.ms)
    .filter((v): v is number => v != null);
  const max = sortValues.length > 0 ? Math.max(...sortValues) * 1.25 : 1;
  return (
    <div className={styles.chart}>
      <div className={styles.chartHeader}>
        <span className={styles.chartLabel}>100 000 rows — sort time (ms)</span>
      </div>
      {rows.map((r) => (
        <div key={r.label}>
          <Bar
            label={r.label}
            value={r.ms}
            max={max}
            display={r.ms != null ? `${r.ms.toFixed(1)} ms` : '—'}
          />
          <p className={styles.rowDesc}>{r.desc}</p>
        </div>
      ))}
    </div>
  );
}

// ── GeneratedNote ─────────────────────────────────────────────────────────────

export function GeneratedNote() {
  const dateStr = data.generated
    ? new Date(data.generated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'pending CI run';
  return (
    <p className={styles.generatedNote}>
      Measured with Criterion (sample-size={data.sample_size ?? '—'}) on{' '}
      <code>ubuntu-22.04</code> · commit <code>{data.sha ?? 'pending'}</code> ·{' '}
      {dateStr}. Updated automatically on every push to <code>main</code> via
      CI.
    </p>
  );
}
