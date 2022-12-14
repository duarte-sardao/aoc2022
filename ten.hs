module Main where
import Data.List
import Data.Set (Set)
import qualified Data.Set as Set

getWordsFromFile :: String -> IO [String]
getWordsFromFile file = readFile file >>= return . words

main :: IO ()
main = do
  wordList <- getWordsFromFile "input.txt"
  let (val, text) = act wordList 0 1 [] []
  print(val)
  mapM_ print (fromList 40 (intercalate "" text))
    
act :: [String] -> Int -> Int -> [Int] -> [String] -> (Int, [String])
act [] _ _ signals drawing = ((foldr (+) 0 signals), (drawing))
act ("noop":wordList) cycle strength signals drawing | mod (ncycle-20) 40 == 0 = act wordList ncycle strength (signals++[strength*ncycle]) ndrawing
                                                     | otherwise = act wordList ncycle strength signals ndrawing
                                                     where ncycle = cycle + 1
                                                           ndrawing = draw drawing 1 cycle strength
act ("addx":val:wordList) cycle strength signals drawing | curmod == 0 || curmod < mod (cycle-20) 40 = act wordList ncycle nstrength (signals++[strength*spotcycle]) ndrawing
                                                         | otherwise = act wordList ncycle nstrength signals ndrawing
                                                         where ncycle = cycle + 2
                                                               nstrength = strength + (read val :: Int)
                                                               curmod = mod (ncycle-20) 40
                                                               spotcycle = ncycle - curmod
                                                               ndrawing = draw drawing 2 cycle strength

draw :: [String] -> Int -> Int -> Int -> [String]
draw drawing 0 _ _ = drawing
draw drawing iter cycle pos = draw (drawing++[if contained then "#" else "."]) (iter-1) (cycle+1) pos
                       where cycle_clamp = mod cycle 40
                             contained = cycle_clamp >= pos-1 && cycle_clamp <= pos+1
                             --i was doing this wrong way around first but it still worked like rn (except i wasnt doing -1 to strength)
                     
fromList :: Int -> [a] -> [[a]] --i did just copy this one
fromList n = foldr (\v a ->
    case a of
        (x:xs) -> if length x < n then (v:x):xs else [v]:a
        _ -> [[v]]
    ) []