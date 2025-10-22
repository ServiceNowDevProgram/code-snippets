# Submit catalog item (Scheduled Job)

This snippet demonstrates how to submit a Service Catalog item programmatically from server-side code using the `sn_sc.CartJS` API.

## Purpose

Add an item to the Service Catalog cart with variables and perform checkout to create the request/req item records.

## Script behavior

- Creates a `sn_sc.CartJS()` cart instance.
- Calls `addToCart()` with `sysparm_id`, optional `sysparm_quantity`, optional `sysparm_requested_for`, and a `variables` object.
- Calls `checkoutCart()` to place the order.
- Logs success or error information using `gs.info`, `gs.warn`, and `gs.error`.

## Placeholders to replace

- `SYS_ID_OF_CAT_ITEM`: the `sys_id` of the Catalog Item (`sc_cat_item` record).
- `SYS_ID_OF_REQUESTED_FOR_USER`: (optional) the `sys_id` of the user to set as Requested For. Remove the property to default to the current user.
- `variable_name1`, `variable_name2`, `variable_nameN` :variable names expected by the catalog item. Use the variable name (not label) unless your instance expects variable IDs.

## Expected returns

You will receive an object containing the request number representating of the created `sc_request` with a `sc_req_item` Item. If unsure, log `JSON.stringify(checkoutInfo)` to inspect.

## Overview
1.Creates a cart instance with sn_sc.CartJS</br>
2.Adds a catalog item to the cart</br>
3.Places the order (checkout)</br>
4.Logs success or error messages


