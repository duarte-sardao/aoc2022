module Main where
import Data.List
import Data.Set (Set)
import qualified Data.Set as Set

getWordsFromFile :: String -> IO [String]
getWordsFromFile file = readFile file >>= return . words

main :: IO ()
main = do
  wordList <- getWordsFromFile "input.txt"
  print(act wordList 0 1 [])
    
act :: [String] -> Int -> Int -> [Int] -> Int
act [] _ _ signals = foldr (+) 0 signals
act ("noop":wordList) cycle strength signals | mod (ncycle-20) 40 == 0 = act wordList ncycle strength (signals++[strength*ncycle])
                                             | otherwise = act wordList ncycle strength signals
                                             where ncycle = cycle + 1
act ("addx":val:wordList) cycle strength signals | curmod == 0 || curmod < mod (cycle-20) 40 = act wordList ncycle nstrength (signals++[strength*spotcycle])
                                                 | otherwise = act wordList ncycle nstrength signals
                                                 where ncycle = cycle + 2
                                                       nstrength = strength + (read val :: Int)
                                                       curmod = mod (ncycle-20) 40
                                                       spotcycle = ncycle - curmod
