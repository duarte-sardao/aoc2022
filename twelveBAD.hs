module Main where
import Data.Char
import Debug.Trace

getWordsFromFile :: String -> IO [String]
getWordsFromFile file = readFile file >>= return . words

replace pos newVal list = take pos list ++ newVal : drop (pos+1) list

change_elem row col x xs =
    let row_to_replace_in = xs !! row
        modified_row = replace col x row_to_replace_in
    in replace row modified_row xs

main :: IO ()
main = do
  wordList <- getWordsFromFile "input.txt"
  print(getExplorin (convert wordList))
  
getExplorin :: [[Int]] -> Int
getExplorin map = min forward down
                  where len = length map
                        forward = explore map 1 0 0 len 0
                        down = explore map 0 1 0 len 0

explore :: [[Int]] -> Int -> Int -> Int -> Int -> Int -> Int
explore map x y len size lastpos | x < 0 || x >= size || y < 0 || y >= size || pos == -1 || abs (pos - lastpos) > 1 = 999999999999
                         | pos == 0 = len
                         | otherwise = min (min (explore numap (x-1) y (len+1) size pos) (explore numap (x+1) y (len+1) size pos)) (min (explore numap x (y-1) (len+1) size pos) (explore numap x (y+1) (len+1) size pos))
                         where pos = map !! y !! x
                               numap = change_elem y x (-1) map


toInt 'E' = 0
toInt 'S' = -1
toInt char = (ord char - 96)

convert :: [String] -> [[Int]]
convert wordList = map (map (toInt)) wordList