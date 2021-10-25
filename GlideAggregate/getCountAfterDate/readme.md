## GlideAggregate
1. Instantiate GlideAggregate object, include table in parameter.
2. `addQuery` method will restrict returned data-set based on added queries.
3. `addAggregate` groups the returned data-set by second argument within parameters & the first argument within the parameters is the calulation ran based on that grouping.
4. `query` runs glideaggregate.
5. `getAggregate` collects the data-set grouped by data.