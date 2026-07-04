# Performance

All numbers on this page come from real [Criterion](https://bheisler.github.io/criterion.rs/book/)
benchmarks running on `ubuntu-22.04` in CI, updated automatically on every push to `main`.
The key claim: **rs-grid's cost scales with what you show, not with what you store.**

## Frame pipeline — O(visible cells)

The complete per-frame cost — `ScrollBy` → viewport recalc → `SceneBuilder::build()` — measured
across wildly different dataset sizes. The renderer sees only the \~275 cells visible in the
viewport at any moment, regardless of how many rows exist in the datasource.


Time per frame (µs)60fps budget: 16,600 µs

20 cols × 10k rows36.2 µs

50 cols × 1M rows48.1 µs

100 cols × 10M rows59.0 µs

1 000 cols × 1B rows60.5 µs

50 cols × 1 quadrillion49.9 µs

All configs render in 65–89 µs — less than 0.6% of the 16.6 ms frame budget at 60fps. Row count has zero impact on frame time.


## Hit-test — O(log n\_cols)

Every click, hover, and drag starts with a hit-test: converting a viewport coordinate to a
`(row, col)` address. Column resolution uses precomputed offsets and a binary search — O(log n\_cols).
Row resolution is O(1) thanks to uniform row height. Total row count has zero effect.


Varying row count (1 000 cols fixed)

| Configuration | Hit-test time |
| --- | --- |
| 1 000 rows, 1 000 cols | 38.2 ns |
| 1 billion rows, 1 000 cols | 53.0 ns |
| 1 quadrillion rows, 1 000 cols | 35.4 ns |

Varying column count (O(log n) in action)

| Columns | Hit-test time |
| --- | --- |
| 10 cols | 13.8 ns |
| 100 cols | 18.6 ns |
| 1 000 cols | 23.0 ns |


The 1.7× increase from 10 → 1 000 columns (10 → 18 ns) reflects the binary search over column
offsets. Going from 1 000 rows to 1 quadrillion rows costs **nothing**.

## Initialization — O(n\_cols)

`GridState::new` precomputes column offsets and flex widths. With `FnDataSource` (virtual rows),
row count is just a `u64` stored in a closure — it carries no allocation cost.


Varying row count — FnDataSource (20 cols fixed)

| Rows | Init time |
| --- | --- |
| 1 000 | 2.7 µs |
| 100 000 | 3.0 µs |
| 1 000 000 | 3.0 µs |
| 100 000 000 | 3.0 µs |
| 1 000 000 000 | 3.0 µs |
| 1 000 000 000 000 000 | 3.0 µs |

Flat regardless of row count — O(n_cols), not O(n_rows).

Varying column count (1M rows fixed)

5 cols0.7 µs

20 cols3.1 µs

50 cols8.0 µs

100 cols16.5 µs

1 000 cols162.2 µs

Initializing a grid with **1 quadrillion virtual rows** takes the same \~5 µs as a grid with
1 000 rows. If you need all data in memory (`VecDataSource`), initialization is still dominated
by column setup, not row count.

## Sort — 100 000 rows

Sort uses a two-phase algorithm: numeric columns use an 8-pass LSD radix sort (O(8n)); string
columns fall back to `sort_unstable_by`. A key cache avoids re-extracting values when toggling
sort direction on the same column.


100 000 rows — sort time (ms)

Numeric sort (cold)21.6 ms

Radix sort, first call — key extraction + sort

Numeric sort (cached)15.7 ms

Radix sort, direction toggle — keys reused from cache

String sort (cold)23.4 ms

Lexicographic comparison sort


Client-side sort is limited to 1 000 000 rows (`MAX_CLIENT_SORT_ROWS`). Beyond that,
rs-grid emits a `SortWarning` and delegates to your backend.

## Memory per row

The datasource determines per-row memory cost. With `FnDataSource`, rows have no allocation —
data is generated on demand. With `VecDataSource`, each `RowRecord` allocates a `HashMap`.


| Data source | Description | Memory / row |
| --- | --- | --- |
| FnDataSource | Virtual / server-side — data generated on demand | **0 bytes** |
| VecDataSource (empty rows) | In-memory, no cell values | 56 B |
| VecDataSource (10 cols, ~8 chars) | In-memory, realistic cell data | 1.1 KB |


For large datasets (> 100k rows), prefer `FnDataSource` with server-side pagination.
See [FnDataSource](/data/fn-datasource.md) and [PageCache](/data/page-cache.md) for implementation details.


Measured with Criterion (sample-size=10) on `ubuntu-22.04` · commit `2158914` · July 4, 2026. Updated automatically on every push to `main` via CI.

