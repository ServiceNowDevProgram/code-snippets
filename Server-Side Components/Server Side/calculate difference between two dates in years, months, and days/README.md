# Get Age in Years, Months, Days  

This snippet calculates the difference between two dates in **years, months, and days**.  
A common use case is to calculate a person’s age from their birthdate or determine elapsed time between two date fields.  

---

## 🔹 Inputs  
- `startDate` – Earlier date (e.g., Birthdate) as a `GlideDateTime`.  
- `endDate` – Later date (e.g., Today) as a `GlideDateTime`.  

---

## 🔹 Output  
Returns an object in the format:  

```json
{
  "years": <number>,
  "months": <number>,
  "days": <number>
}
