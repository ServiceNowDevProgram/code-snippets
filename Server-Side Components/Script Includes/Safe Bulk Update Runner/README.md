# Safe Bulk Update Runner (auto-throttled)

## Use case
Run large backfills/hygiene tasks without timeouts or instance impact. Instead of one risky long transaction, process records in chunks and automatically schedule the next slice.

## Where to use it
- Script Include invoked from Background Script, on-demand Scheduled Job, or Flow Action wrapper.

## How it works
- Queries a time-boxed chunk (e.g., 40 seconds, 500 rows).
- Executes a caller-supplied per-record function.
- Saves a checkpoint (`sys_id`) in a system property.
- Uses `ScheduleOnce` to queue the next slice (no `gs.sleep`).

## Configuration
- Target table, encoded query, orderBy field (default `sys_id`)
- Chunk size, max execution seconds
- Property name for checkpoint
