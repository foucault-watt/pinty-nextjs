| table_name       | column_name         | data_type                   | is_nullable | column_default    |
| ---------------- | ------------------- | --------------------------- | ----------- | ----------------- |
| bar              | id                  | uuid                        | NO          | gen_random_uuid() |
| bar              | created_at          | timestamp with time zone    | NO          | now()             |
| bar              | owner               | uuid                        | YES         | null              |
| bar              | name                | text                        | YES         | null              |
| bar              | city                | text                        | YES         | null              |
| beer             | id                  | uuid                        | NO          | gen_random_uuid() |
| beer             | created_at          | timestamp with time zone    | NO          | now()             |
| beer             | name                | text                        | YES         | null              |
| beer             | alcohol             | real                        | YES         | null              |
| beer             | type                | text                        | YES         | null              |
| beer             | country             | text                        | YES         | null              |
| beer             | description         | text                        | YES         | null              |
| beer             | author              | uuid                        | YES         | null              |
| beer             | is_global           | boolean                     | YES         | false             |
| keg              | id                  | uuid                        | NO          | gen_random_uuid() |
| keg              | created_at          | timestamp with time zone    | NO          | now()             |
| keg              | beer_id             | uuid                        | NO          | null              |
| keg              | capacity_ml         | integer                     | NO          | null              |
| keg              | bar_id              | uuid                        | NO          | null              |
| keg              | created_by          | uuid                        | NO          | null              |
| keg              | tapped_at           | timestamp without time zone | YES         | null              |
| keg              | closed_at           | timestamp without time zone | YES         | null              |
| keg              | remaining_volume_ml | integer                     | NO          | null              |
| keg              | status              | text                        | NO          | 'stored'::text    |
| profiles         | id                  | uuid                        | NO          | null              |
| profiles         | email               | text                        | YES         | null              |
| profiles         | full_name           | text                        | YES         | null              |
| profiles         | avatar_url          | text                        | YES         | null              |
| profiles         | created_at          | timestamp with time zone    | NO          | now()             |
| profiles         | updated_at          | timestamp with time zone    | NO          | now()             |
| profiles         | is_admin            | boolean                     | YES         | false             |
| ref_profiles_bar | id                  | uuid                        | NO          | gen_random_uuid() |
| ref_profiles_bar | created_at          | timestamp with time zone    | NO          | now()             |
| ref_profiles_bar | profile             | uuid                        | YES         | null              |
| ref_profiles_bar | bar                 | uuid                        | YES         | null              |
| ref_profiles_bar | role                | text                        | YES         | null              |