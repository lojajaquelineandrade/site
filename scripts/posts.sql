SELECT
  u.display_name AS author,
  p.post_name AS name,
  p.post_title AS title,
  p.post_date_gmt AS date_gmt,
  p.post_content AS content
FROM wp_posts AS p
INNER JOIN wp_users AS u
  ON u.ID = p.post_author
WHERE p.post_status = "publish"
  AND p.post_type = "post";
